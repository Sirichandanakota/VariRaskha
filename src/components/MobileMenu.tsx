import { AnimatePresence, motion } from 'framer-motion'
import { BookOpen, Info, Globe, History, X, ArrowRight } from 'lucide-react'
import { Link } from 'react-router-dom'
import { useAppContext } from '../context/AppContext'
import { translations } from '../data/translations'

export function MobileMenu() {
  const { menuOpen, setMenuOpen, language } = useAppContext()
  const copy = translations[language]
  const menuItems = [
    
    { label: copy.history, to: '/history', icon: History },
   // { label: copy.home, to: '/home', icon: House },
    { label: copy.library, to: '/library', icon: BookOpen },
    { label: copy.language, to: '/language', icon: Globe },
    { label: copy.about, to: '/about', icon: Info },
  ]

  return (
    <AnimatePresence>
      {menuOpen ? (
        <>
          <motion.button
            type="button"
            aria-label={copy.closeMenu}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setMenuOpen(false)}
            className="fixed inset-0 z-40 bg-[#17211C]/30"
          />

          <motion.aside
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', stiffness: 260, damping: 26 }}
            className="fixed right-0 top-0 z-50 flex h-full w-[82%] max-w-sm flex-col bg-white px-5 pb-8 pt-5 shadow-2xl"
          >
            <div className="mb-8 flex items-center justify-end">
              <div>
              </div>
              <button
                type="button"
                aria-label={copy.closeMenu}
                onClick={() => setMenuOpen(false)}
                className="rounded-full border border-[#DDE8E1] p-2 text-[#17211C]"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            <div className="space-y-2">
              {menuItems.map(({ label, to, icon: Icon }) => (
                <Link
                  key={label}
                  to={to}
                  onClick={() => setMenuOpen(false)}
                  className="flex items-center justify-between rounded-2xl border border-[#DDE8E1] bg-[#F3FBF7] px-4 py-3 text-left text-base font-medium text-[#17211C]"
                >
                  <span className="flex items-center gap-3">
                    <Icon className="h-5 w-5 text-[#0B8F5A]" />
                    {label}
                  </span>
                  <ArrowRight className="h-4 w-4 text-[#66736C]" />
                </Link>
              ))}
            </div>

            <div className="mt-auto pt-6">
              <Link
                to="/home"
                onClick={() => setMenuOpen(false)}
                className="flex items-center justify-center gap-2 rounded-2xl bg-[#0B8F5A] px-5 py-4 text-base font-semibold text-white shadow-sm"
              >
                {copy.analyzeImage} <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </motion.aside>
        </>
      ) : null}
    </AnimatePresence>
  )
}
