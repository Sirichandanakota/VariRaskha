
import { Menu, Globe } from 'lucide-react'
import { Link, useNavigate } from 'react-router-dom'
import logoMark from '../assets/logo.png'
import { useAppContext } from '../context/AppContext'
import { translations } from '../data/translations'

export function Header() {
  const { setMenuOpen, language } = useAppContext()
  const copy = translations[language]
  const navigate = useNavigate()

  return (
    <header className="sticky top-0 z-30 border-b border-[#DDE8E1] bg-white/90 backdrop-blur-sm">
      <div className="mx-auto flex max-w-5xl items-center justify-between px-4 py-3 sm:px-6">

        {/* Logo and application name */}
        <Link
          to="/home"
          className="flex min-w-0 items-center gap-3"
          aria-label={copy.goHome}
        >
          <img
            src={logoMark}
            alt={copy.logoAlt}
            className="h-10 w-10 shrink-0 rounded-2xl object-contain"
          />

          <h1 className="text-lg font-semibold text-[#17211C]">
            {copy.appName}
          </h1>
        </Link>

        {/* Language page and menu */}
        <div className="flex shrink-0 items-center gap-2">

          {/* Open the language selection page */}
          <button
            type="button"
            onClick={() => {
              setMenuOpen(false)
              navigate('/language')
            }}
            aria-label="Choose language"
            title="Choose language"
            className="flex h-10 items-center justify-center gap-1.5 rounded-full border border-[#DDE8E1] bg-[#F3FBF7] px-3 text-[#0B8F5A] transition-colors hover:bg-[#EAF8F1] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#0B8F5A]"
          >
            <Globe className="h-5 w-5" />
            <span className="text-sm font-semibold">
              {language === 'en' ? 'EN' : 'తె'}
            </span>
          </button>

          {/* Existing hamburger menu */}
          <button
            type="button"
            aria-label={copy.openMenu}
            onClick={() => setMenuOpen(true)}
            className="flex h-10 w-10 items-center justify-center rounded-full border border-[#DDE8E1] bg-[#F3FBF7] text-[#17211C] transition-transform hover:scale-[1.02] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#0B8F5A]"
          >
            <Menu className="h-5 w-5" />
          </button>

        </div>
      </div>
    </header>
  )
}
