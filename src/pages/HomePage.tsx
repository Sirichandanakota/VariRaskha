import {
  Lightbulb,
  Leaf,
  Languages,
  BookOpen,
  History,
  Info,
  ArrowRight,
  Sprout,
} from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import { useState } from 'react'
import { motion } from 'framer-motion'
import { Header } from '../components/Header'
import { UploadBox } from '../components/UploadBox'
import { useAppContext } from '../context/AppContext'
import { validateImage } from '../services/localInference'
import { translations } from '../data/translations'

export function HomePage() {
  const navigate = useNavigate()

  const {
    selectedImage,
    setSelectedImage,
    setSelectedFile,
    setImageName,
    setAnalysisStatus,
    setPrediction,
    analysisError,
    setAnalysisError,
    language,
  } = useAppContext()

  const copy = translations[language]
  const [error, setError] = useState<string | null>(null)
  const isTelugu = language === 'te'

  const text = {
    supportedClasses: isTelugu ? 'వరి తరగతులు' : 'Rice classes',
    languages: isTelugu ? 'మద్దతు ఉన్న భాషలు' : 'Languages',

    classesDescription: isTelugu
      ? 'ఆరోగ్యకరమైన వరి మరియు 9 వ్యాధులు'
      : 'Healthy rice and 9 disease classes',

    languagesDescription: isTelugu
      ? 'తెలుగు మరియు ఇంగ్లీష్'
      : 'Telugu and English',

    quickOverview: isTelugu ? 'త్వరిత వివరాలు' : 'Quick overview',

    tipsDescription: isTelugu
      ? 'మెరుగైన ఫలితాల కోసం ఈ సూచనలు పాటించండి.'
      : 'Follow these tips for better results.',

    about: isTelugu ? 'మా గురించి' : 'About',
    library: isTelugu ? 'వ్యాధుల లైబ్రరీ' : 'Disease Library',
    history: isTelugu ? 'చరిత్ర' : 'History',
    quickLinks: isTelugu ? 'త్వరిత లింకులు' : 'Quick Links',

    footerDescription: isTelugu
      ? 'వరి పంట ఆరోగ్యాన్ని అర్థం చేసుకోవడానికి రైతులకు సహాయపడే AI ఆధారిత సాధనం.'
      : 'An AI-powered tool to help farmers understand rice crop health.',

    footerNote: isTelugu
      ? 'వ్యాధి నిర్వహణకు సంబంధించిన నిర్ణయాలకు ముందు వ్యవసాయ నిపుణులను సంప్రదించండి.'
      : 'Consult an agricultural expert before making disease management decisions.',

    copyright: isTelugu
      ? 'అన్ని హక్కులు ప్రత్యేకించబడ్డాయి.'
      : 'All rights reserved.',

    home: isTelugu ? 'హోమ్' : 'Home',
  }

  const handleFile = async (
    file: File,
    source: 'camera' | 'gallery',
  ) => {
    setError(null)
    setAnalysisError(null)

    const validTypes = ['image/jpeg', 'image/png', 'image/jpg']

    if (!validTypes.includes(file.type)) {
      setError(copy.fileTypeError)
      return
    }

    if (file.size > 10 * 1024 * 1024) {
      setError(copy.fileSizeError)
      return
    }

    const validation = await validateImage(file)

    if (validation === 'crop-not-detected') {
      navigate('/crop-not-detected')
      return
    }

    if (validation === 'low-confidence') {
      navigate('/low-confidence')
      return
    }

    const url = URL.createObjectURL(file)

    if (selectedImage?.startsWith('blob:')) {
      URL.revokeObjectURL(selectedImage)
    }

    setSelectedImage(url)
    setSelectedFile(file)
    setImageName(file.name)
    setAnalysisStatus('preview')
    setPrediction(null)

    if (source === 'gallery') {
      navigate('/preview')
    }
  }

  const handleRemove = () => {
    if (selectedImage?.startsWith('blob:')) {
      URL.revokeObjectURL(selectedImage)
    }

    setSelectedImage(null)
    setSelectedFile(null)
    setImageName('')
    setAnalysisStatus('idle')
    setPrediction(null)
    setError(null)
    setAnalysisError(null)
  }

  return (
    <div className="page-shell min-h-screen">
      <Header />

      <main className="mx-auto max-w-5xl px-4 pb-8 pt-3 sm:px-6 sm:pt-5">
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.25 }}
        >
          {/* Page heading */}
          <div className="mb-5">
            <h1 className="text-2xl font-semibold leading-tight text-[#17211C] sm:text-3xl lg:text-4xl">
              {copy.uploadRiceImage}
            </h1>
          </div>

          {/* Main dashboard: upload left, tips right */}
          <section className="grid grid-cols-1 items-start gap-5 lg:grid-cols-[minmax(0,1.15fr)_minmax(280px,0.85fr)] lg:gap-6">
            {/* Upload box */}
            <div className="min-w-0">
              <UploadBox
                selectedImage={selectedImage}
                onFileSelected={handleFile}
                onUpload={() => navigate('/preview')}
                onRemove={handleRemove}
              />

              {(error || analysisError) && (
                <p
                  role="alert"
                  className="mt-3 text-sm font-medium text-[#E53935]"
                >
                  {error || analysisError}
                </p>
              )}
            </div>

            {/* Image suggestions */}
            <aside className="min-w-0 rounded-[22px] border border-[#DDE8E1] bg-white p-4 shadow-sm sm:p-5">
              <div className="mb-2 flex items-center gap-2 text-[#17211C]">
                <Lightbulb className="h-5 w-5 shrink-0 text-[#F4A000]" />
                <h2 className="font-semibold">{copy.tips}</h2>
              </div>

              <p className="mb-4 text-sm leading-6 text-[#66736C]">
                {text.tipsDescription}
              </p>

              <ul className="space-y-3 text-sm leading-6 text-[#66736C] lg:space-y-1.5 lg:leading-5">
                {[copy.clearTip, copy.leafTip, copy.unrelatedTip].map(
                  (tip) => (
                    <li key={tip} className="flex items-start gap-2">
                      <span className="mt-1 inline-flex h-4 w-4 shrink-0 items-center justify-center rounded-full bg-[#EAF8F1] text-[0.65rem] font-bold text-[#0B8F5A]">
                        ✓
                      </span>
                      <span>{tip}</span>
                    </li>
                  ),
                )}
              </ul>
            </aside>
          </section>

          {/* 10 Rice Classes and 2 Languages — moved below upload and suggestions */}
          <section
            aria-label={text.quickOverview}
            className="mt-5 grid grid-cols-2 gap-3 sm:mt-6 sm:gap-4"
          >
            {/* Rice classes */}
            <div className="flex min-w-0 items-center gap-3 rounded-2xl border border-[#DDE8E1] bg-white p-3 shadow-sm sm:p-4">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[#EAF8F1] text-[#0B8F5A] sm:h-12 sm:w-12">
                <Leaf className="h-5 w-5 sm:h-6 sm:w-6" />
              </div>

              <div className="min-w-0">
                <p className="text-2xl font-semibold leading-tight text-[#17211C] sm:text-3xl">
                  10
                </p>

                <p className="mt-1 text-sm font-medium text-[#17211C]">
                  {text.supportedClasses}
                </p>

                <p className="mt-1 hidden text-xs leading-5 text-[#66736C] sm:block">
                  {text.classesDescription}
                </p>
              </div>
            </div>

            {/* Supported languages */}
            <div className="flex min-w-0 items-center gap-3 rounded-2xl border border-[#DDE8E1] bg-white p-3 shadow-sm sm:p-4">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[#EAF8F1] text-[#0B8F5A] sm:h-12 sm:w-12">
                <Languages className="h-5 w-5 sm:h-6 sm:w-6" />
              </div>

              <div className="min-w-0">
                <p className="text-2xl font-semibold leading-tight text-[#17211C] sm:text-3xl">
                  2
                </p>

                <p className="mt-1 text-sm font-medium text-[#17211C]">
                  {text.languages}
                </p>

                <p className="mt-1 hidden text-xs leading-5 text-[#66736C] sm:block">
                  {text.languagesDescription}
                </p>
              </div>
            </div>
          </section>

          {/* Disease Library call-to-action */}
          <section className="mt-8 rounded-[22px] border border-[#DDE8E1] bg-[#EAF8F1] p-5 sm:mt-10 sm:p-6">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
              <div className="flex items-start gap-3">
                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-white text-[#0B8F5A] shadow-sm">
                  <Sprout className="h-6 w-6" />
                </div>

                <div>
                  <h2 className="font-semibold text-[#17211C]">
                    {text.library}
                  </h2>

                  <p className="mt-1 text-sm leading-6 text-[#66736C]">
                    {isTelugu
                      ? 'వరి పంటలో కనిపించే వ్యాధులు మరియు లక్షణాలను తెలుసుకోండి.'
                      : 'Explore rice diseases, their symptoms, and available guidance.'}
                  </p>
                </div>
              </div>

              <button
                type="button"
                onClick={() => navigate('/library')}
                className="inline-flex shrink-0 items-center justify-center gap-2 self-start rounded-xl bg-[#0B8F5A] px-4 py-2.5 text-sm font-medium text-white transition hover:bg-[#087447] sm:self-center"
              >
                {isTelugu ? 'లైబ్రరీ చూడండి' : 'Explore Library'}
                <ArrowRight className="h-4 w-4" />
              </button>
            </div>
          </section>
        </motion.div>
      </main>

      {/* Footer */}
      <footer className="border-t border-[#DDE8E1] bg-white">
        <div className="mx-auto w-full max-w-7xl px-4 py-7 sm:px-6 sm:py-8 lg:px-8">
          <div className="grid grid-cols-1 gap-7 sm:grid-cols-2 lg:grid-cols-[1.5fr_1fr] lg:gap-12">
            {/* Brand */}
            <div>
              <button
                type="button"
                onClick={() => navigate('/home')}
                className="inline-flex items-center gap-3 text-left"
                aria-label={text.home}
              >
                <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-[#EAF8F1] text-[#0B8F5A]">
                  <Sprout className="h-7 w-7" />
                </span>

                <span className="text-lg font-semibold text-[#17211C]">
                  Vari Raksha AI
                </span>
              </button>

              <p className="mt-3 max-w-md text-sm leading-6 text-[#66736C]">
                {text.footerDescription}
              </p>

              <div className="mt-3 inline-flex items-center gap-2 rounded-full bg-[#EAF8F1] px-3 py-1.5 text-xs font-medium text-[#0B8F5A]">
                <Languages className="h-4 w-4" />
                English · తెలుగు
              </div>
            </div>

            {/* Footer navigation */}
            <nav aria-label={text.quickLinks}>
              <h2 className="mb-3 text-sm font-semibold text-[#17211C]">
                {text.quickLinks}
              </h2>

              <ul className="space-y-3">
                <li>
                  <button
                    type="button"
                    onClick={() => navigate('/about')}
                    className="inline-flex items-center gap-2 text-sm text-[#66736C] transition hover:text-[#0B8F5A]"
                  >
                    <Info className="h-4 w-4" />
                    {text.about}
                  </button>
                </li>

                <li>
                  <button
                    type="button"
                    onClick={() => navigate('/library')}
                    className="inline-flex items-center gap-2 text-sm text-[#66736C] transition hover:text-[#0B8F5A]"
                  >
                    <BookOpen className="h-4 w-4" />
                    {text.library}
                  </button>
                </li>

                <li>
                  <button
                    type="button"
                    onClick={() => navigate('/history')}
                    className="inline-flex items-center gap-2 text-sm text-[#66736C] transition hover:text-[#0B8F5A]"
                  >
                    <History className="h-4 w-4" />
                    {text.history}
                  </button>
                </li>
              </ul>
            </nav>
          </div>

          <div className="mt-7 border-t border-[#DDE8E1] pt-5">
            <p className="text-xs leading-5 text-[#66736C]">
              {text.footerNote}
            </p>

            <p className="mt-3 text-xs text-[#66736C]">
              © {new Date().getFullYear()} Vari Raksha AI. {text.copyright}
            </p>
          </div>
        </div>
      </footer>
    </div>
  )
}