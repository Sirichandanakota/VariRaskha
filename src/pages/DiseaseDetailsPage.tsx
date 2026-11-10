
import {
  ArrowLeft,
  ChevronLeft,
  ChevronRight,
  ArrowDownToLine,
  X,
  ZoomIn,
  ZoomOut,
} from 'lucide-react'
import { useNavigate, useParams } from 'react-router-dom'
import { diseaseMap } from '../data/diseases'
import { Header } from '../components/Header'
import { useMemo, useState } from 'react'
import { useAppContext } from '../context/AppContext'
import { translations } from '../data/translations'
import { downloadImage } from '../utils/downloadImage'

export function DiseaseDetailsPage() {
  const navigate = useNavigate()
  const { id } = useParams()
  const { language } = useAppContext()
  const copy = translations[language]

  const [imageIndex, setImageIndex] = useState(0)
  const [showImage, setShowImage] = useState(false)
  const [zoomed, setZoomed] = useState(false)

  const disease = useMemo(() => {
    if (!id) return undefined
    return diseaseMap[id as keyof typeof diseaseMap]
  }, [id])

  const closeImage = () => {
    setShowImage(false)
    setZoomed(false)
  }

  if (!disease) {
    return (
      <div className="page-shell min-h-screen pb-24">
        <Header />
        <main className="mx-auto w-full max-w-5xl px-4 py-6 sm:px-6">
          <button
            type="button"
            onClick={() => navigate('/library')}
            className="inline-flex items-center gap-2 text-sm text-[#66736C]"
          >
            <ArrowLeft className="h-4 w-4" />
            {copy.backToLibrary}
          </button>
          <p className="mt-6 text-[#17211C]">{copy.diseaseNotFound}</p>
        </main>
      </div>
    )
  }

  const currentImage = disease.images[imageIndex]

  return (
    <div className="page-shell min-h-screen pb-24">
      <Header />

      {/* Full-width responsive page content */}
      <main className="mx-auto w-full max-w-5xl px-4 py-6 sm:px-6">
        <button
          type="button"
          onClick={() => navigate('/library')}
          className="inline-flex items-center gap-2 text-sm text-[#66736C] transition hover:text-[#0B8F5A]"
        >
          <ArrowLeft className="h-4 w-4" />
          {copy.backToLibrary}
        </button>

        {/* Only the image carousel is narrow */}
        <div className="relative mx-auto mt-6 aspect-[4/3] w-full max-w-[448px] overflow-hidden rounded-[24px] border border-[#DDE8E1] bg-white shadow-sm">
          <button
            type="button"
            onClick={() => setShowImage(true)}
            className="absolute inset-0 h-full w-full cursor-zoom-in"
            aria-label="Open image to zoom"
          >
            <img
              src={currentImage}
              alt={`${disease.name[language]} ${copy.imageOf} ${imageIndex + 1}`}
              className="h-full w-full object-cover"
            />
          </button>

          {disease.images.length > 1 && (
            <>
              <button
                type="button"
                aria-label={copy.previousImage}
                onClick={() =>
                  setImageIndex(
                    (value) =>
                      (value + disease.images.length - 1) %
                      disease.images.length
                  )
                }
                className="absolute left-3 top-1/2 z-10 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full bg-white/90 text-[#17211C] shadow-sm"
              >
                <ChevronLeft className="h-5 w-5" />
              </button>

              <button
                type="button"
                aria-label={copy.nextImage}
                onClick={() =>
                  setImageIndex((value) => (value + 1) % disease.images.length)
                }
                className="absolute right-3 top-1/2 z-10 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full bg-white/90 text-[#17211C] shadow-sm"
              >
                <ChevronRight className="h-5 w-5" />
              </button>

              <div className="pointer-events-none absolute bottom-3 left-1/2 z-10 -translate-x-1/2 rounded-full bg-[#17211C]/70 px-3 py-1 text-xs text-white">
                {imageIndex + 1} / {disease.images.length}
              </div>
            </>
          )}

          <button
            type="button"
            onClick={(event) => {
              event.stopPropagation()
              downloadImage(
                currentImage,
                `${disease.id}-rice-leaf-${imageIndex + 1}.png`,
              )
            }}
            aria-label={`${copy.downloadImage}: ${disease.name[language]}`}
            className="absolute right-3 top-3 z-10 flex h-9 w-9 items-center justify-center rounded-full bg-white/95 text-[#17211C] shadow-sm transition hover:bg-white"
          >
            <ArrowDownToLine className="h-4 w-4" />
          </button>

          <div className="pointer-events-none absolute bottom-3 right-3 z-10 rounded-full bg-white/90 p-2 text-[#17211C] shadow-sm">
            <ZoomIn className="h-4 w-4" />
          </div>
        </div>

        {/* Title uses the available page width */}
        <div className="mt-5 flex items-start justify-between gap-3">
          <h1 className="min-w-0 text-3xl font-semibold leading-tight text-[#17211C] sm:text-4xl">
            {disease.name[language]}
          </h1>

          <span className="mt-1 shrink-0 rounded-full bg-[#EAF8F1] px-3 py-1 text-xs font-medium text-[#0B8F5A]">
            {disease.category[language]}
          </span>
        </div>

        {/* Information cards: mobile stack, desktop three columns */}
        <div className="mt-6 grid grid-cols-1 gap-3 sm:grid-cols-3">
          <div className="min-w-0 rounded-[18px] border border-[#DDE8E1] bg-white p-4 shadow-sm">
            <p className="text-xs uppercase tracking-[0.12em] text-[#66736C]">
              {copy.scientificName}
            </p>
            <p className="mt-2 font-semibold text-[#17211C]">
              {disease.scientificName}
            </p>
          </div>

          <div className="min-w-0 rounded-[18px] border border-[#DDE8E1] bg-white p-4 shadow-sm">
            <p className="text-xs uppercase tracking-[0.12em] text-[#66736C]">
              {copy.affectedParts}
            </p>
            <p className="mt-2 font-semibold text-[#17211C]">
              {disease.affectedParts[language]}
            </p>
          </div>

          <div className="min-w-0 rounded-[18px] border border-[#DDE8E1] bg-white p-4 shadow-sm">
            <p className="text-xs uppercase tracking-[0.12em] text-[#66736C]">
              {copy.symptoms}
            </p>
            <p className="mt-2 font-semibold leading-6 text-[#17211C]">
              {disease.symptoms[language]}
            </p>
          </div>
        </div>

        {/* Remaining details use full responsive width */}
        <div className="mt-6 rounded-[22px] border border-[#DDE8E1] bg-white p-4 shadow-sm sm:p-6">
          <h2 className="text-lg font-semibold text-[#17211C]">
            {copy.overview}
          </h2>

          <p className="mt-2 text-sm leading-6 text-[#66736C]">
            {disease.description[language]}
          </p>

          <div className="mt-5 space-y-4">
            <div>
              <p className="text-xs uppercase tracking-[0.12em] text-[#66736C]">
                {copy.generalGuidance}
              </p>
              <p className="mt-2 text-sm text-[#17211C]">
                {copy.followGuidance}
              </p>
            </div>

            <div>
              <p className="text-xs uppercase tracking-[0.12em] text-[#66736C]">
                {copy.management}
              </p>
              <ul className="mt-2 list-disc space-y-1 pl-5 text-sm leading-6 text-[#66736C]">
                {disease.management[language].map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </div>

            <div>
              <p className="text-xs uppercase tracking-[0.12em] text-[#66736C]">
                {copy.causes}
              </p>
              <p className="mt-2 text-sm leading-6 text-[#17211C]">
                {disease.causes[language]}
              </p>
            </div>

            <div>
              <p className="text-xs uppercase tracking-[0.12em] text-[#66736C]">
                {copy.recommendations}
              </p>
              <ul className="mt-2 list-disc space-y-1 pl-5 text-sm leading-6 text-[#66736C]">
                {disease.management[language].map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </div>

            <div>
              <p className="text-xs uppercase tracking-[0.12em] text-[#66736C]">
                {copy.prevention}
              </p>
              <ul className="mt-2 list-disc space-y-1 pl-5 text-sm leading-6 text-[#66736C]">
                {disease.prevention[language].map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </main>

      {/* Full-screen image viewer with zoom and navigation */}
      {showImage && (
        <div
          className="fixed inset-0 z-[100] flex items-center justify-center overflow-hidden bg-black/95 p-4"
          onClick={closeImage}
          role="dialog"
          aria-modal="true"
          aria-label="Image viewer"
          onKeyDown={(event) => {
            if (event.key === 'Escape') closeImage()
          }}
        >
          <button
            type="button"
            onClick={closeImage}
            className="absolute right-4 top-4 z-20 rounded-full bg-white/15 p-3 text-white hover:bg-white/25"
            aria-label="Close image viewer"
          >
            <X className="h-6 w-6" />
          </button>

          <button
            type="button"
            onClick={(event) => {
              event.stopPropagation()
              setZoomed((value) => !value)
            }}
            className="absolute bottom-5 right-4 z-20 rounded-full bg-white p-3 text-[#17211C]"
            aria-label={zoomed ? 'Zoom out' : 'Zoom in'}
          >
            {zoomed ? (
              <ZoomOut className="h-5 w-5" />
            ) : (
              <ZoomIn className="h-5 w-5" />
            )}
          </button>

          <img
            src={currentImage}
            alt={`${disease.name[language]} ${copy.imageOf} ${imageIndex + 1}`}
            onClick={(event) => {
              event.stopPropagation()
              setZoomed((value) => !value)
            }}
            className={[
              'max-h-[85vh] max-w-full object-contain transition-transform duration-200',
              zoomed
                ? 'scale-150 cursor-zoom-out'
                : 'scale-100 cursor-zoom-in',
            ].join(' ')}
          />

          {disease.images.length > 1 && (
            <>
              <button
                type="button"
                onClick={(event) => {
                  event.stopPropagation()
                  setImageIndex(
                    (value) =>
                      (value + disease.images.length - 1) %
                      disease.images.length
                  )
                  setZoomed(false)
                }}
                className="absolute left-3 top-1/2 z-20 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full bg-white/90 text-[#17211C]"
                aria-label={copy.previousImage}
              >
                <ChevronLeft className="h-6 w-6" />
              </button>

              <button
                type="button"
                onClick={(event) => {
                  event.stopPropagation()
                  setImageIndex((value) => (value + 1) % disease.images.length)
                  setZoomed(false)
                }}
                className="absolute right-3 top-1/2 z-20 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full bg-white/90 text-[#17211C]"
                aria-label={copy.nextImage}
              >
                <ChevronRight className="h-6 w-6" />
              </button>

              <div className="pointer-events-none absolute bottom-6 left-1/2 -translate-x-1/2 rounded-full bg-white/15 px-3 py-1 text-sm text-white">
                {imageIndex + 1} / {disease.images.length}
              </div>
            </>
          )}

          <button
            type="button"
            onClick={(event) => {
              event.stopPropagation()
              downloadImage(
                currentImage,
                `${disease.id}-rice-leaf-${imageIndex + 1}.png`,
              )
            }}
            aria-label={`${copy.downloadImage}: ${disease.name[language]}`}
            className="absolute right-4 top-4 z-20 flex h-11 w-11 items-center justify-center rounded-full bg-white text-[#17211C] shadow-sm"
          >
            <ArrowDownToLine className="h-5 w-5" />
          </button>
        </div>
      )}
    </div>
  )
}
