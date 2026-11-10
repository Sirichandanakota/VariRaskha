import { AlertTriangle, ArrowLeft } from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Button } from '../components/Button'
import { Header } from '../components/Header'
import { useAppContext } from '../context/AppContext'
import { translations } from '../data/translations'

export function LowConfidencePage() {
  const navigate = useNavigate()
  const { selectedImage, language } = useAppContext()
  const copy = translations[language]

  return (
    <div className="page-shell pb-24">
      <Header />
      <div className="mx-auto max-w-5xl px-4 py-6 sm:px-6">
        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.25 }}>
          <button type="button" onClick={() => navigate('/home')} className="mb-4 inline-flex items-center gap-2 text-sm font-medium text-[#66736C]">
            <ArrowLeft className="h-4 w-4" />
            {copy.back}
          </button>

          <div className="rounded-[24px] border border-[#F7E5B8] bg-[#FFF9E6] p-4 shadow-sm">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#FFF3D1] text-[#F4A000]">
                <AlertTriangle className="h-5 w-5" />
              </div>
              <div>
                <p className="text-sm font-medium text-[#66736C]">{copy.predictionUncertain}</p>
                <h2 className="text-xl font-semibold text-[#17211C]">{copy.clearerImageMessage}</h2>
              </div>
            </div>
          </div>

          {selectedImage ? (
            <div className="mt-6 overflow-hidden rounded-[24px] border border-[#DDE8E1] bg-white shadow-sm">
              <img src={selectedImage} alt={copy.lowConfidenceAlt} className="h-56 w-full object-cover" />
            </div>
          ) : null}

          <div className="mt-6 rounded-[22px] border border-[#DDE8E1] bg-white p-5 shadow-sm">
            <p className="text-sm text-[#66736C]">{copy.imageNotClear}</p>
            <ul className="mt-3 space-y-2 text-sm text-[#66736C]">
              <li>✓ {copy.clearImageTip}</li>
              <li>✓ {copy.avoidBlurry}</li>
              <li>✓ {copy.riceLeafTip}</li>
            </ul>
          </div>

          <div className="mt-6">
            <Button fullWidth onClick={() => navigate('/home')}>
              {copy.tryAgain}
            </Button>
          </div>
        </motion.div>
      </div>
    </div>
  )
}
