import { ChevronDown } from 'lucide-react'
import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

type InfoCardProps = {
  title: string
  content: string
}

export function InfoCard({ title, content }: InfoCardProps) {
  const [open, setOpen] = useState(false)

  return (
    <div className="overflow-hidden rounded-[18px] border border-[#DDE8E1] bg-white shadow-sm">
      <button
        type="button"
        onClick={() => setOpen((value) => !value)}
        className="flex w-full items-center justify-between gap-3 px-4 py-4 text-left"
      >
        <span className="font-semibold text-[#17211C]">{title}</span>
        <ChevronDown className={['h-5 w-5 text-[#66736C] transition-transform', open ? 'rotate-180' : ''].join(' ')} />
      </button>

      <AnimatePresence initial={false}>
        {open ? (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="overflow-hidden"
          >
            <p className="px-4 pb-4 text-sm leading-6 text-[#66736C]">{content}</p>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </div>
  )
}
