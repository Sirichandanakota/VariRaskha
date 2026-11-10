import { motion } from 'framer-motion'
import { ArrowLeft } from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import { Header } from '../components/Header'
import { InfoCard } from '../components/InfoCard'
import farmerHero from '../assets/farmer-hero.svg'
import { useAppContext } from '../context/AppContext'
import { translations } from '../data/translations'

export function AboutPage() {
  const { language } = useAppContext()
  const copy = translations[language]
  const navigate = useNavigate()

  return (
    <div className="page-shell pb-16">
      <Header />

       <main className="mx-auto max-w-5xl px-4 pb-8 pt-3 sm:px-6 sm:pt-5">
        <button
          type="button"
          onClick={() => navigate('/home')}
          className="mb-2 inline-flex items-center gap-1.5 text-sm font-medium text-[#66736C] transition hover:text-[#0B8F5A]"
        >
          <ArrowLeft className="h-4 w-4" />
          Home
        </button>

        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.25 }}
          className="w-full min-w-0"
        >
          <h1 className="mt-0 mb-2 text-3xl font-semibold sm:text-4xl">
            {copy.aboutTitle}
          </h1>

          <p className="mt-0 text-sm text-[#66736C] sm:text-base">
            {copy.aboutDescription}
          </p>

          <div className="mt-3 w-full overflow-hidden rounded-[24px] border border-[#DDE8E1] bg-white shadow-sm">
            <img
              src={farmerHero}
              alt={copy.aboutTitle}
              className="block h-56 w-full object-cover"
            />
          </div>

          <div className="mt-6 flex w-full min-w-0 flex-col gap-3">
            <InfoCard
              title={copy.aboutWhat}
              content={copy.aboutWhatText}
            />
            <InfoCard
              title={copy.howItWorks}
              content={copy.howItWorksText}
            />
            <InfoCard
              title={copy.aboutClear}
              content={copy.aboutClearText}
            />
            <InfoCard
              title={copy.aboutAudience}
              content={copy.aboutAudienceText}
            />
            <InfoCard
              title={copy.aboutLimits}
              content={copy.aboutLimitsText}
            />
          </div>
        </motion.div>
      </main>
    </div>
  )
}