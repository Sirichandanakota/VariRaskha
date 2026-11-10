
import { useState } from 'react'
import { ArrowLeft, ArrowRight } from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import logoMark from '../assets/logo.png'
import { useAppContext } from '../context/AppContext'
import { Button } from '../components/Button'
import { translations, type Language } from '../data/translations'

export function LanguagePage() {
  const navigate = useNavigate()
  const { language, setLanguage } = useAppContext()

  // Keep the current app language unchanged until Continue is pressed.
  const [selectedLanguage, setSelectedLanguage] =
    useState<Language>(language)

  // Use the selected language for the labels on this page.
  const copy = translations[selectedLanguage]

  const languages = [
    { label: translations.en.english, value: 'en' as Language, icon: 'A' },
    { label: translations.en.telugu, value: 'te' as Language, icon: 'తె' },
  ]

  const onContinue = () => {
    setLanguage(selectedLanguage)
    navigate('/home')
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      transition={{ duration: 0.25 }}
      className="relative flex min-h-screen items-center justify-center bg-[#F4F9F5] px-5 py-10"
    >
      <button
        type="button"
        onClick={() => navigate('/home')}
        aria-label="Back to Home"
        title="Back to Home"
        className="absolute left-4 top-4 z-10 flex h-10 w-10 items-center justify-center rounded-full border border-[#DDE8E1] bg-white text-[#17211C] shadow-sm transition hover:bg-[#EAF8F1] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#0B8F5A]"
      >
        <ArrowLeft className="h-5 w-5" />
      </button>

      <div className="w-full max-w-md text-center">
        <div className="mx-auto mb-6 flex h-24 w-24 items-center justify-center rounded-[28px] bg-white shadow-sm ring-1 ring-[#DDE8E1]">
          <img
            src={logoMark}
            alt={copy.logoAlt}
            className="h-16 w-16 object-contain"
          />
        </div>

        <h1 className="text-3xl font-bold text-[#17211C]">
          {copy.appName}
        </h1>

        <p className="mt-7 text-left text-[1.75rem] font-semibold text-[#17211C]">
          {copy.languagePrompt}
        </p>

        <div className="mt-6 space-y-3">
          {languages.map((item) => {
            const selected = selectedLanguage === item.value

            return (
              <button
                key={item.value}
                type="button"
                onClick={() => setSelectedLanguage(item.value)}
                aria-pressed={selected}
                className={[
                  'flex w-full items-center justify-between rounded-[20px] border px-4 py-4 text-left transition',
                  selected
                    ? 'border-[#0B8F5A] bg-[#EAF8F1] text-[#17211C]'
                    : 'border-[#DDE8E1] bg-white text-[#17211C]',
                ].join(' ')}
              >
                <span className="flex items-center gap-3">
                  <span className="flex h-10 w-10 items-center justify-center rounded-full bg-[#F3FBF7] text-sm font-bold text-[#0B8F5A]">
                    {item.icon}
                  </span>

                  <span className="text-base font-medium">
                    {item.label}
                  </span>
                </span>

                <ArrowRight className="h-4 w-4 text-[#66736C]" />
              </button>
            )
          })}
        </div>

        <div className="mt-8">
          <Button
            onClick={onContinue}
            fullWidth
            className="py-4 text-base"
          >
            {copy.continue}
            <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </div>
      </div>
    </motion.div>
  )
}
