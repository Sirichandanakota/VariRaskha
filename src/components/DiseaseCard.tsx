import { ArrowRight } from 'lucide-react'
import { Link } from 'react-router-dom'
import type { Disease } from '../data/diseases'
import { useAppContext } from '../context/AppContext'
export function DiseaseCard({ disease }: { disease: Disease }) {
  const { language } = useAppContext()

  const isDisease = disease.id !== 'healthy'

  // Use the first image from the disease's image array.
  const thumbnail = disease.images[0]

  return (
    <Link
      to={`/disease/${disease.id}`}
      className="group flex items-center gap-3 rounded-[20px] border border-[#DDE8E1] bg-white p-3 shadow-sm transition duration-200 hover:-translate-y-0.5 hover:shadow-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#0B8F5A]"
    >
      {/* Disease thumbnail */}
      <div className="relative h-16 w-16 shrink-0 overflow-hidden rounded-2xl bg-[#EAF8F1]">
        {thumbnail ? (
          <img
            src={thumbnail}
            alt={disease.name[language]}
            className="h-full w-full object-cover transition duration-300 group-hover:scale-105"
            loading="lazy"
            onError={(event) => {
              // Hide a broken image instead of showing broken-image text.
              event.currentTarget.style.display = 'none'
            }}
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center text-2xl">
            🌾
          </div>
        )}
      </div>

      {/* Disease information */}
      <div className="flex min-w-0 flex-1 items-center justify-between gap-2">
        <div className="min-w-0">
          <p className="break-words font-semibold text-[#17211C]">
            {disease.name[language]}
          </p>

          <span
            className={[
              'mt-1 inline-flex rounded-full px-2 py-1 text-[0.65rem] font-medium',
              isDisease
                ? 'bg-[#FFF0F0] text-[#D92D20]'
                : 'bg-[#EAF8F1] text-[#0B8F5A]',
            ].join(' ')}
          >
            {disease.category[language]}
          </span>
        </div>

        {/* Navigation arrow */}
        <ArrowRight
          aria-hidden="true"
          className="h-4 w-4 shrink-0 text-[#66736C] transition-transform duration-200 group-hover:translate-x-1"
        />
      </div>
    </Link>
  )
}
