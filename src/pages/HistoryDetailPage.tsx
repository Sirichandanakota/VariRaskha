import { ArrowLeft, Download, Trash2 } from 'lucide-react'
import { useNavigate, useParams } from 'react-router-dom'
import { Header } from '../components/Header'
import { diseaseMap } from '../data/diseases'
import { translations } from '../data/translations'
import { useAppContext } from '../context/AppContext'

export function HistoryDetailPage() {
  const navigate = useNavigate()
  const { id } = useParams()
  const { history, language, removeHistoryEntry } = useAppContext()
  const copy = translations[language]
  const entry = history.find((item) => item.id === id)
  const disease = entry?.diseaseId ? diseaseMap[entry.diseaseId as keyof typeof diseaseMap] : undefined

  if (!entry) {
    return (
      <div className="page-shell pb-24">
        <Header />
        <div className="mx-auto max-w-5xl px-4 py-6 sm:px-6">
          <button type="button" onClick={() => navigate('/history')} className="inline-flex items-center gap-2 text-sm text-[#66736C]">
            <ArrowLeft className="h-4 w-4" /> {copy.history}
          </button>
          <p className="mt-6 text-[#17211C]">{copy.noHistory}</p>
        </div>
      </div>
    )
  }

  const title = disease?.name[language] ?? entry.prediction
  const isDisease = entry.status === 'disease'
  const downloadImage = async () => {
    if (!entry.image) return

    const response = await fetch(entry.image)
    const blob = await response.blob()
    const file = new File(
      [blob],
      `${title.replace(/[^a-z0-9]+/gi, '-').toLowerCase() || 'rice-image'}.png`,
      { type: blob.type || 'image/png' },
    )

    if (navigator.share && navigator.canShare?.({ files: [file] })) {
      await navigator.share({ files: [file], title })
      return
    }

    const url = URL.createObjectURL(blob)
    const link = document.createElement('a')
    link.href = url
    link.download = file.name
    link.click()
    URL.revokeObjectURL(url)
  }

  return (
    <div className="page-shell pb-24">
      <Header />
      <div className="mx-auto max-w-5xl px-4 py-6 sm:px-6">
        <button type="button" onClick={() => navigate('/history')} className="inline-flex items-center gap-2 text-sm text-[#66736C]">
          <ArrowLeft className="h-4 w-4" /> {copy.history}
        </button>

        <div className="mt-6 overflow-hidden rounded-[24px] border border-[#DDE8E1] bg-white shadow-sm">
          {entry.image ? <img src={entry.image} alt={title} className="h-[360px] w-full object-cover" /> : <div className="h-[360px] bg-[#F3FBF7]" />}
        </div>

        <div className="mt-5 flex items-start justify-between gap-3">
          <div>
            <h2 className="text-[2rem] font-semibold text-[#17211C]">{title}</h2>
            <span className={['mt-2 inline-flex rounded-full px-3 py-1 text-xs font-medium', isDisease ? 'bg-[#FFF0F0] text-[#D92D20]' : 'bg-[#EAF8F1] text-[#0B8F5A]'].join(' ')}>
              {disease?.category[language] ?? copy.healthy}
            </span>
          </div>
          <button
            type="button"
            onClick={() => {
              removeHistoryEntry(entry.id)
              navigate('/history')
            }}
            aria-label={`${copy.delete}: ${title}`}
            className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full text-[#D92D20] transition hover:bg-[#FFF0F0]"
          >
            <Trash2 className="h-5 w-5" />
          </button>
        </div>

        <div className="mt-5 rounded-[22px] border border-[#DDE8E1] bg-white p-4 text-sm text-[#66736C] shadow-sm">
          <p>{copy.confidence}: <span className="font-semibold text-[#17211C]">{entry.confidence.toFixed(1)}%</span></p>
          <p className="mt-2">{copy.analyzedOn} {new Date(entry.date).toLocaleString(language === 'te' ? 'te-IN' : 'en-IN')}</p>
          {disease ? <p className="mt-2">{copy.scientificName}: <span className="font-semibold text-[#17211C]">{disease.scientificName}</span></p> : null}
        </div>

        {entry.image ? (
          <button
            type="button"
            onClick={() => void downloadImage()}
            className="mt-4 inline-flex w-full items-center justify-center gap-2 rounded-2xl bg-[#0B8F5A] px-5 py-3.5 text-sm font-semibold text-white shadow-sm transition hover:bg-[#087F4E]"
          >
            <Download className="h-4 w-4" />
            {copy.downloadImage}
          </button>
        ) : null}
      </div>
    </div>
  )
}
