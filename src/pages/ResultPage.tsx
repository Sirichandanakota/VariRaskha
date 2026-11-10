import { useMemo } from 'react'
import { useNavigate } from 'react-router-dom'
import { Header } from '../components/Header'
import { ResultCard } from '../components/ResultCard'
import { diseaseMap } from '../data/diseases'
import { useAppContext } from '../context/AppContext'
import { translations } from '../data/translations'

export function ResultPage() {
  const navigate = useNavigate()
  const { prediction, selectedImage, clearCurrentImage, language } = useAppContext()
  const copy = translations[language]

  const disease = useMemo(() => {
    if (!prediction || !prediction.diseaseId) return undefined
    return diseaseMap[prediction.diseaseId as keyof typeof diseaseMap]
  }, [prediction])

  const handleAnalyzeAnother = () => {
    clearCurrentImage()
    navigate('/home')
  }

  if (!prediction) {
    return (
      <div className="page-shell pb-24">
        <Header />
        <div className="mx-auto max-w-5xl px-4 py-6 text-center sm:px-6">
          <p className="text-sm text-[#66736C]">{copy.noResult}</p>
        </div>
      </div>
    )
  }

  return (
    <div className="page-shell pb-24">
      <Header />
      <div className="mx-auto max-w-5xl px-4 py-6 sm:px-6">
        <ResultCard
          prediction={prediction}
          selectedImage={selectedImage}
          disease={disease}
          onAnalyzeAnother={handleAnalyzeAnother}
          onViewDetails={() => {
            if (prediction.diseaseId) navigate(`/disease/${prediction.diseaseId}`)
          }}
        />
      </div>
    </div>
  )
}
