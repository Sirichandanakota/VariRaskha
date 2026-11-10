import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { AnalysisLoader } from '../components/AnalysisLoader'
import { useAppContext } from '../context/AppContext'
import { analyzeImage } from '../services/localInference'

const readImageAsDataUrl = (file: File) => new Promise<string>((resolve, reject) => {
  const reader = new FileReader()
  reader.onload = () => resolve(String(reader.result))
  reader.onerror = () => reject(reader.error)
  reader.readAsDataURL(file)
})

export function AnalysisPage() {
  const navigate = useNavigate()
  const {
    selectedFile,
    selectedImage,
    imageName,
    addHistoryEntry,
    setPrediction,
    setAnalysisStatus,
    setAnalysisError,
  } = useAppContext()

  useEffect(() => {
    const runAnalysis = async () => {
      if (!selectedFile) {
        navigate('/home')
        return
      }

      try {
        const result = await analyzeImage(selectedFile)

        if (result.status === 'crop-not-detected') {
          setAnalysisStatus('error')
          navigate('/crop-not-detected')
          return
        }

        if (result.status === 'low-confidence') {
          setAnalysisStatus('error')
          navigate('/low-confidence')
          return
        }

        setPrediction({
          id: result.diseaseId,
          name: result.prediction,
          confidence: result.confidence,
          status: result.diseaseId === 'healthy' ? 'healthy' : 'disease',
          diseaseId: result.diseaseId,
          model: result.model,
          probabilities: result.probabilities,
        })

        let historyImage = selectedImage ?? undefined
        try {
          historyImage = await readImageAsDataUrl(selectedFile)
        } catch {
          historyImage = selectedImage ?? undefined
        }

        addHistoryEntry({
          prediction: result.prediction,
          confidence: result.confidence,
          status: result.diseaseId === 'healthy' ? 'healthy' : 'disease',
          diseaseId: result.diseaseId,
          imageLabel: imageName,
          image: historyImage,
        })

        setAnalysisStatus('result')
        window.setTimeout(() => navigate('/result'), 250)
      } catch (error) {
        setAnalysisError(error instanceof Error ? error.message : 'The prediction service is unavailable.')
        setAnalysisStatus('error')
        navigate('/home')
      }
    }

    const timer = window.setTimeout(() => {
      void runAnalysis()
    }, 800)

    return () => window.clearTimeout(timer)
  }, [addHistoryEntry, imageName, navigate, selectedFile, selectedImage, setAnalysisError, setAnalysisStatus, setPrediction])

  return <AnalysisLoader />
}
