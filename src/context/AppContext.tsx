import {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from 'react'
import type { Language } from '../data/translations'

export type PredictionStatus =
  | 'healthy'
  | 'disease'
  | 'crop-not-detected'
  | 'low-confidence'

export type PredictionRecord = {
  id: string
  name: string
  confidence: number
  status: PredictionStatus
  diseaseId?: string
  model?: string
  probabilities?: Record<string, number>
}

export type HistoryEntry = {
  id: string
  date: string
  prediction: string
  confidence: number
  diseaseId?: string
  status: PredictionStatus
  imageLabel?: string
  image?: string
}

type AppContextValue = {
  language: Language
  setLanguage: (value: Language) => void
  selectedImage: string | null
  setSelectedImage: (value: string | null) => void
  selectedFile: File | null
  setSelectedFile: (value: File | null) => void
  imageName: string
  setImageName: (value: string) => void
  analysisStatus: 'idle' | 'preview' | 'analyzing' | 'result' | 'error'
  setAnalysisStatus: (status: 'idle' | 'preview' | 'analyzing' | 'result' | 'error') => void
  prediction: PredictionRecord | null
  setPrediction: (value: PredictionRecord | null) => void
  menuOpen: boolean
  setMenuOpen: (value: boolean) => void
  history: HistoryEntry[]
  addHistoryEntry: (entry: Omit<HistoryEntry, 'id' | 'date'>) => void
  removeHistoryEntry: (id: string) => void
  clearCurrentImage: () => void
  analysisError: string | null
  setAnalysisError: (value: string | null) => void
}

const AppContext = createContext<AppContextValue | undefined>(undefined)

const readStorage = <T,>(key: string, fallback: T): T => {
  try {
    const stored = window.localStorage.getItem(key)
    return stored ? JSON.parse(stored) : fallback
  } catch {
    return fallback
  }
}

export function AppProvider({ children }: { children: ReactNode }) {
  const [language, setLanguageState] = useState<Language>(() => {
    const stored = readStorage<string | null>('vari-raksha-language', null)
    return stored === 'te' || stored === 'తెలుగు' ? 'te' : 'en'
  })
  const [selectedImage, setSelectedImage] = useState<string | null>(null)
  const [selectedFile, setSelectedFile] = useState<File | null>(null)
  const [imageName, setImageName] = useState('')
  const [analysisStatus, setAnalysisStatus] = useState<'idle' | 'preview' | 'analyzing' | 'result' | 'error'>('idle')
  const [analysisError, setAnalysisError] = useState<string | null>(null)
  const [prediction, setPrediction] = useState<PredictionRecord | null>(null)
  const [menuOpen, setMenuOpen] = useState(false)
  const [history, setHistory] = useState<HistoryEntry[]>(() => {
    return readStorage<HistoryEntry[]>('vari-raksha-history', [])
  })

  useEffect(() => {
    window.localStorage.setItem('vari-raksha-language', JSON.stringify(language))
  }, [language])

  useEffect(() => {
    window.localStorage.setItem('vari-raksha-history', JSON.stringify(history))
  }, [history])

  const setLanguage = (value: Language) => {
    setLanguageState(value)
  }

  const addHistoryEntry = (entry: Omit<HistoryEntry, 'id' | 'date'>) => {
    const record: HistoryEntry = {
      ...entry,
      id: `${Date.now()}-${Math.random()}`,
      date: new Date().toISOString(),
    }

    setHistory((prev) => [record, ...prev].slice(0, 8))
  }

  const removeHistoryEntry = (id: string) => {
    setHistory((prev) => prev.filter((entry) => entry.id !== id))
  }

  const clearCurrentImage = () => {
    setSelectedImage(null)
    setSelectedFile(null)
    setImageName('')
    setPrediction(null)
    setAnalysisStatus('idle')
    setAnalysisError(null)
  }

  const value = useMemo<AppContextValue>(
    () => ({
      language,
      setLanguage,
      selectedImage,
      setSelectedImage,
      selectedFile,
      setSelectedFile,
      imageName,
      setImageName,
      analysisStatus,
      setAnalysisStatus,
      prediction,
      setPrediction,
      menuOpen,
      setMenuOpen,
      history,
      addHistoryEntry,
      removeHistoryEntry,
      clearCurrentImage,
      analysisError,
      setAnalysisError,
    }),
    [language, selectedImage, selectedFile, imageName, analysisStatus, prediction, menuOpen, history, analysisError],
  )

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>
}

export function useAppContext() {
  const context = useContext(AppContext)

  if (!context) {
    throw new Error('useAppContext must be used inside AppProvider')
  }

  return context
}
