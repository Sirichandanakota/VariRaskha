import { motion } from 'framer-motion'
import { Leaf } from 'lucide-react'
import { useAppContext } from '../context/AppContext'
import { translations } from '../data/translations'

export function AnalysisLoader() {
  const { language } = useAppContext()
  const copy = translations[language]
  return (
    <div className="flex min-h-[70vh] flex-col items-center justify-center px-6 text-center">
      <motion.div
        animate={{ rotate: 360 }}
        transition={{ repeat: Infinity, duration: 1.8, ease: 'linear' }}
        className="relative flex h-28 w-28 items-center justify-center rounded-full border-[8px] border-[#EAF8F1] border-t-[#0B8F5A]"
      >
        <div className="flex h-14 w-14 items-center justify-center rounded-full bg-[#EAF8F1] text-[#0B8F5A] shadow-sm">
          <Leaf className="h-7 w-7" />
        </div>
      </motion.div>

      <div className="mt-8 space-y-3">
        <h2 className="text-[1.8rem] font-semibold leading-tight text-[#17211C]">
          {copy.analyzing}
        </h2>
        <p className="text-sm text-[#66736C]">{copy.analyzingDescription}</p>
      </div>

      <div className="mt-8 flex w-full max-w-xs items-center justify-between text-[0.7rem] font-medium text-[#66736C]">
        <span className="flex items-center gap-2 text-[#0B8F5A]">
          <span className="flex h-6 w-6 items-center justify-center rounded-full bg-[#0B8F5A] text-white">1</span>
          {copy.upload}
        </span>
        <span className="flex items-center gap-2 text-[#0B8F5A]">
          <span className="flex h-6 w-6 items-center justify-center rounded-full bg-[#EAF8F1] text-[#0B8F5A] ring-2 ring-[#0B8F5A]">2</span>
          {copy.analyze}
        </span>
        <span className="flex items-center gap-2 text-[#66736C]">
          <span className="flex h-6 w-6 items-center justify-center rounded-full bg-[#F3FBF7] text-[#66736C]">3</span>
          {copy.result}
        </span>
      </div>

      <p className="mt-8 text-sm text-[#66736C]">{copy.pleaseWait}</p>
    </div>
  )
}
