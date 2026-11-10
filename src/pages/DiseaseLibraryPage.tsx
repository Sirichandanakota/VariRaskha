import { useMemo, useState } from 'react'
import { Header } from '../components/Header'
import { DiseaseCard } from '../components/DiseaseCard'
import { diseases } from '../data/diseases'
import { translations } from '../data/translations'
import { useAppContext } from '../context/AppContext'
import { ArrowLeft } from 'lucide-react'
import { useNavigate } from 'react-router-dom'


export function DiseaseLibraryPage() {
  const [tab, setTab] = useState('all')
  const { language } = useAppContext()
  const copy = translations[language]
  const navigate = useNavigate()
  const filtered = useMemo(() => {
    return diseases.filter((disease) => {
      const matchesTab = tab === 'all' || disease.category[language] === (tab === 'healthy' ? copy.healthy : copy.disease)
      return matchesTab

    })
  }, [copy.disease, copy.healthy, language, tab])

  return (
    <div className="page-shell pb-24">
      <Header />
      <div className="mx-auto max-w-5xl px-4 py-6 sm:px-6">
        <button
        type="button"
        onClick={() => navigate('/home')}
        className="mb-1 inline-flex items-center gap-1.5 text-sm font-medium text-[#66736C] hover:text-[#0B8F5A]"
      >
        <ArrowLeft className="h-4 w-4" />
        Home
      </button>

        <h2 className="text-[2rem] font-semibold text-[#17211C]">{copy.library}</h2>

        <div className="mt-2 flex gap-2 overflow-x-auto pb-1">
          {[['all', copy.all], ['healthy', copy.healthy], ['disease', copy.disease]].map(([value, label]) => (
            <button
              key={value}
              type="button"
              onClick={() => setTab(value)}
              className={[
                'rounded-full px-4 py-2 text-sm font-medium transition',
                tab === value ? 'bg-[#0B8F5A] text-white' : 'bg-[#EAF8F1] text-[#0B8F5A]',
              ].join(' ')}
            >
              {label}
            </button>
          ))}
        </div>

        <div className="mt-5 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {filtered.map((disease) => (
            <DiseaseCard key={disease.id} disease={disease} />
          ))}
        </div>
      </div>
    </div>
  )
}
