import type { DiseaseId } from '../data/diseases'

export type AIResult =
  | {
      status: 'success'
      diseaseId: DiseaseId
      confidence: number
      prediction: string
      model: string
      probabilities: Record<string, number>
    }
  | {
      status: 'crop-not-detected'
    }
  | {
      status: 'low-confidence'
    }

const configuredApiBaseUrl = import.meta.env.VITE_API_BASE_URL?.trim()
const API_BASE_URL = (
  configuredApiBaseUrl || (import.meta.env.DEV ? 'http://127.0.0.1:8000' : '')
).replace(/\/$/, '')
const MODEL_ID = import.meta.env.VITE_MODEL_ID
const RETRY_DELAYS_MS = [0, 2000, 5000, 10000]

export async function validateImage(file: File): Promise<'valid' | 'crop-not-detected' | 'low-confidence'> {
  if (!file) return 'crop-not-detected'

  const allowedTypes = ['image/jpeg', 'image/jpg', 'image/png']
  if (!allowedTypes.includes(file.type) || file.size <= 0 || file.size > 10 * 1024 * 1024) {
    return 'crop-not-detected'
  }

  return 'valid'
}

export async function analyzeImage(file: File): Promise<AIResult> {
  const validation = await validateImage(file)
  if (validation !== 'valid') return { status: validation }
  if (!API_BASE_URL) {
    throw new Error(
      'Prediction is not configured for this deployment. Set VITE_API_BASE_URL to the public HTTPS URL of the FastAPI backend and redeploy the frontend.',
    )
  }

  const formData = new FormData()
  formData.append('image', file)
  if (MODEL_ID) formData.append('model', MODEL_ID)

  let response: Response | undefined
  for (const delay of RETRY_DELAYS_MS) {
    if (delay > 0) await new Promise((resolve) => window.setTimeout(resolve, delay))
    try {
      response = await fetch(`${API_BASE_URL}/predict`, {
        method: 'POST',
        body: formData,
      })
      if (response.status !== 503) break
    } catch (error) {
      if (delay === RETRY_DELAYS_MS[RETRY_DELAYS_MS.length - 1]) {
        throw new Error(
          `Unable to connect to the prediction server at ${API_BASE_URL}. Check that the backend is deployed, healthy, and allows this frontend origin.`,
          { cause: error },
        )
      }
    }
  }

  if (!response) {
    throw new Error('The prediction server did not return a response.')
  }

  if (!response.ok) {
    let detail = `Prediction request failed (${response.status})`
    try {
      const body = await response.json() as { detail?: string; message?: string }
      detail = body.detail ?? body.message ?? detail
    } catch {
      // Keep the HTTP error when the server does not return JSON.
    }
    if (response.status === 422) return { status: 'crop-not-detected' }
    if (response.status === 409) return { status: 'low-confidence' }
    throw new Error(detail)
  }

  const result = await response.json() as {
    predicted_class: string
    disease_id: DiseaseId
    confidence: number
    model: string
    probabilities: Record<string, number>
  }

  return {
    status: 'success',
    diseaseId: result.disease_id,
    confidence: result.confidence,
    prediction: result.predicted_class,
    model: result.model,
    probabilities: result.probabilities,
  }
}
