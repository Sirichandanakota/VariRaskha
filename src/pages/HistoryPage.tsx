
import { ArrowLeft, Trash2 } from 'lucide-react'
import { Link, useNavigate } from 'react-router-dom'
import { Header } from '../components/Header'
import { diseaseMap } from '../data/diseases'
import { translations } from '../data/translations'
import { useAppContext } from '../context/AppContext'

export function HistoryPage() {
  const { history, language, removeHistoryEntry } = useAppContext()
  const copy = translations[language]
  const navigate = useNavigate()

  return (
    <div className="page-shell pb-24">
      <Header />

      <main className="mx-auto max-w-5xl px-4 pb-8 pt-3 sm:px-6 sm:pt-5">
        {/* Home back button */}

<button
  type="button"
  onClick={() => navigate('/home')}
  aria-label="Back to Home"
  className="mb-1 inline-flex items-center gap-1.5 text-sm font-medium text-[#66736C] transition hover:text-[#0B8F5A]"
>
  <ArrowLeft className="h-4 w-4" />
  <span>Home</span>
</button>



        {/* History heading */}
        <h2 className="mb-4 text-[2rem] font-semibold leading-tight text-[#17211C]">
          {copy.history}
        </h2>

        {history.length === 0 ? (
          <p className="rounded-[20px] border border-[#DDE8E1] bg-white p-5 text-sm text-[#66736C] shadow-sm">
            {copy.noHistory}
          </p>
        ) : (
          <div className="space-y-4">
            {history.map((entry) => {
              const disease = entry.diseaseId
                ? diseaseMap[
                    entry.diseaseId as keyof typeof diseaseMap
                  ]
                : undefined

              const title = disease?.name[language] ?? entry.prediction
              const isDisease = entry.status === 'disease'

              return (
                <article
                  key={entry.id}
                  className="flex gap-3 rounded-[20px] border border-[#DDE8E1] bg-white p-3 shadow-sm sm:p-4"
                >
                  <Link
                    to={`/history/${entry.id}`}
                    className="flex min-w-0 flex-1 gap-3"
                  >
                    {entry.image ? (
                      <img
                        src={entry.image}
                        alt={title}
                        className="h-24 w-24 shrink-0 rounded-2xl object-cover"
                      />
                    ) : (
                      <div
                        className="h-24 w-24 shrink-0 rounded-2xl bg-[#F3FBF7]"
                        aria-hidden="true"
                      />
                    )}

                    <div className="min-w-0 flex-1">
                      <h3 className="text-sm font-semibold text-[#17211C]">
                        {title}
                      </h3>

                      <span
                        className={[
                          'mt-2 inline-flex rounded-full px-2 py-1 text-[10px] font-medium',
                          isDisease
                            ? 'bg-[#FFF0F0] text-[#D92D20]'
                            : 'bg-[#EAF8F1] text-[#0B8F5A]',
                        ].join(' ')}
                      >
                        {disease?.category[language] ?? copy.healthy}
                      </span>

                      <p className="mt-1 text-[10px] leading-relaxed text-[#66736C]">
                        {copy.confidence}: {entry.confidence.toFixed(1)}% ·{' '}
                        {copy.analyzedOn}{' '}
                        {new Date(entry.date).toLocaleString(
                          language === 'te' ? 'te-IN' : 'en-IN',
                        )}
                      </p>
                    </div>
                  </Link>

                  <button
                    type="button"
                    onClick={() => removeHistoryEntry(entry.id)}
                    aria-label={`${copy.delete}: ${title}`}
                    title={copy.delete}
                    className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full text-[#D92D20] transition hover:bg-[#FFF0F0]"
                  >
                    <Trash2 className="h-4 w-4" />
                  </button>
                </article>
              )
            })}
          </div>
        )}
      </main>
    </div>
  )
}
