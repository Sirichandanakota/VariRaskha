import { ArrowLeft, ArrowRight, Trash2 } from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Button } from '../components/Button'
import { Header } from '../components/Header'
import { useAppContext } from '../context/AppContext'
import { translations } from '../data/translations'

export function ImagePreviewPage() {
  const navigate = useNavigate()
  const { selectedImage, setSelectedImage, setSelectedFile, setAnalysisStatus, setPrediction, language } = useAppContext()
  const copy = translations[language]

  const handleAnalyze = () => {
    setAnalysisStatus('analyzing')
    navigate('/analyzing')
  }

  const handleRemove = () => {
    if (selectedImage && selectedImage.startsWith('blob:')) {
      URL.revokeObjectURL(selectedImage)
    }
    setSelectedImage(null)
    setSelectedFile(null)
    setPrediction(null)
    setAnalysisStatus('idle')
    navigate('/home')
  }

  return (
    <div className="page-shell pb-24">
      <Header />
      <div className="mx-auto max-w-5xl px-4 py-6 sm:px-6">
        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.25 }}>
          <button type="button" onClick={() => navigate('/home')} className="mb-4 inline-flex items-center gap-2 text-sm font-medium text-[#66736C]">
            <ArrowLeft className="h-4 w-4" />
            {copy.back}
          </button>

          <h2 className="text-[2rem] font-semibold text-[#17211C]">{copy.reviewImage}</h2>
          <p className="mt-2 text-sm text-[#66736C]">{copy.reviewDescription}</p>

          {selectedImage ? (
            <div className="mt-5 overflow-hidden rounded-[24px] border border-[#DDE8E1] bg-white shadow-sm">
              <img src={selectedImage} alt={copy.selectedLeafAlt} className="h-[360px] w-full object-cover" />
            </div>
          ) : null}

          <div className="mt-6 flex gap-3">
            <Button variant="secondary" className="flex-1" onClick={() => navigate('/home')}>
              {copy.changeImage}
            </Button>
            <Button variant="danger" className="flex-1" onClick={handleRemove}>
              <Trash2 className="mr-2 h-4 w-4" />
              {copy.remove}
            </Button>
          </div>

          <div className="mt-6">
            <Button onClick={handleAnalyze} fullWidth className="py-4 text-base">
              {copy.analyzeImage} <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </div>
        </motion.div>
      </div>
    </div>
  )
}
