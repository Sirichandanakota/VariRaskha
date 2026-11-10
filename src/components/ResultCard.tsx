import { AlertTriangle, CheckCircle2, ArrowRight } from 'lucide-react'
import { motion } from 'framer-motion'
import type { Disease } from '../data/diseases'
import { useAppContext } from '../context/AppContext'
import { translations } from '../data/translations'

type ResultCardProps = {
  prediction: {
    name: string
    confidence: number
    diseaseId?: string
    model?: string
    status: 'healthy' | 'disease' | 'crop-not-detected' | 'low-confidence'
  }
  selectedImage: string | null
  disease?: Disease
  onViewDetails?: () => void
  onAnalyzeAnother?: () => void
}

export function ResultCard({ prediction, selectedImage, disease, onViewDetails, onAnalyzeAnother }: ResultCardProps) {
  const isHealthy = prediction.status === 'healthy'
  const { language } = useAppContext()
  const copy = translations[language]

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.25 }}
      className="space-y-5 pb-20"
    >
      <div
        className={[
          'flex items-center rounded-[22px] border px-4 py-4 shadow-sm',
          isHealthy ? 'border-[#DDE8E1] bg-[#EAF8F1]' : 'border-[#F7DADA] bg-[#FFF0F0]',
        ].join(' ')}
      >
        {isHealthy ? (
          <CheckCircle2 className="mr-3 h-6 w-6 text-[#0B8F5A]" />
        ) : (
          <AlertTriangle className="mr-3 h-6 w-6 text-[#E53935]" />
        )}
        <div>
          <p className="text-sm text-[#66736C]">{isHealthy ? copy.healthyCrop : copy.diseaseDetected}</p>
          <h3 className="text-xl font-semibold text-[#17211C]">
            {isHealthy ? disease?.name[language] || prediction.name : disease?.name[language] || prediction.name}
          </h3>
        </div>
      </div>

      {selectedImage ? (
        <div className="overflow-hidden rounded-[22px] border border-[#DDE8E1] bg-white shadow-sm">
          <img src={selectedImage} alt={copy.cropPreviewAlt} className="h-56 w-full object-cover" />
        </div>
      ) : null}

      <div className="space-y-2 rounded-[22px] border border-[#DDE8E1] bg-white p-4 shadow-sm">
        <div className="flex items-center justify-between text-sm text-[#66736C]">
          <span>{copy.confidence}</span>
          <span className="font-semibold text-[#17211C]">{prediction.confidence.toFixed(1)}%</span>
        </div>
        <div className="h-2.5 overflow-hidden rounded-full bg-[#EAF8F1]">
          <div
            className={['h-full rounded-full', isHealthy ? 'bg-[#0B8F5A]' : 'bg-[#E53935]'].join(' ')}
            style={{ width: `${Math.min(100, Math.max(0, prediction.confidence))}%` }}
          />
        </div>
        {prediction.model ? (
          <p className="pt-1 text-xs text-[#66736C]">Model: {prediction.model}</p>
        ) : null}
      </div>

      <div className="space-y-3 rounded-[22px] border border-[#DDE8E1] bg-white p-4 shadow-sm">
        <h3 className="text-xl font-semibold text-[#17211C]">
          {isHealthy ? copy.healthyMessage : copy.aboutDisease}
        </h3>
        <p className="text-sm text-[#66736C]">
          {disease?.description[language] || copy.recommendedMessage}
        </p>
      </div>

      {!isHealthy ? (
        <div className="rounded-[22px] border border-[#DDE8E1] bg-[#EAF8F1] p-4">
          <h4 className="font-semibold text-[#17211C]">{copy.recommendedActions}</h4>
          <p className="mt-2 text-sm text-[#66736C]">{copy.recommendedMessage}</p>
        </div>
      ) : (
        <div className="rounded-[22px] border border-[#DDE8E1] bg-[#EAF8F1] p-4">
          <h4 className="font-semibold text-[#17211C]">{copy.keepHealthy}</h4>
          <ul className="mt-3 space-y-2 text-sm text-[#66736C]">
            <li>• {copy.healthyTipManagement}</li>
            <li>• {copy.healthyTipMonitor}</li>
            <li>• {copy.healthyTipIrrigation}</li>
            <li>• {copy.healthyTipHygiene}</li>
          </ul>
        </div>
      )}

      <div className="flex flex-col gap-3 pt-2">
        {!isHealthy && onViewDetails ? (
          <button
            type="button"
            onClick={onViewDetails}
            className="flex items-center justify-center gap-2 rounded-2xl bg-[#0B8F5A] px-5 py-3.5 text-sm font-semibold text-white shadow-sm transition hover:bg-[#087F4E]"
          >
            {copy.viewDetails}
            <ArrowRight className="h-4 w-4" />
          </button>
        ) : null}

        {onAnalyzeAnother ? (
          <button
            type="button"
            onClick={onAnalyzeAnother}
            className="rounded-2xl bg-[#EAF8F1] px-5 py-3.5 text-sm font-semibold text-[#0B8F5A] transition hover:bg-[#DCF4E9]"
          >
            {copy.analyzeAnother}
          </button>
        ) : null}
      </div>
    </motion.div>
  )
}
