
import { CloudUpload, ImagePlus, Camera, RotateCcw } from 'lucide-react'
import { useRef, useState, type ChangeEvent, type DragEvent } from 'react'
import { Button } from './Button'
import { useAppContext } from '../context/AppContext'
import { translations } from '../data/translations'

type UploadBoxProps = {
  selectedImage: string | null
  onFileSelected: (file: File, source: 'camera' | 'gallery') => void
  onUpload: () => void
  onRemove: () => void
}

export function UploadBox({
  selectedImage,
  onFileSelected,
  onUpload,
  onRemove,
}: UploadBoxProps) {
  const { language } = useAppContext()
  const copy = translations[language]

  const galleryInputRef = useRef<HTMLInputElement | null>(null)
  const cameraInputRef = useRef<HTMLInputElement | null>(null)
  const [isDragActive, setIsDragActive] = useState(false)

  const handleFile = (
    file: File | undefined,
    source: 'camera' | 'gallery',
  ) => {
    if (file) onFileSelected(file, source)
  }

  const handleInputChange = (
    event: ChangeEvent<HTMLInputElement>,
    source: 'camera' | 'gallery',
  ) => {
    const file = event.target.files?.[0]
    handleFile(file, source)
    event.target.value = ''
  }

  const onDrop = (event: DragEvent<HTMLDivElement>) => {
    event.preventDefault()
    setIsDragActive(false)
    handleFile(event.dataTransfer.files?.[0], 'gallery')
  }

  const imageInput = (
    <>
      <input
        ref={galleryInputRef}
        type="file"
        accept="image/jpeg,image/png"
        className="hidden"
        aria-label={copy.chooseImageFile}
        onChange={(event) => handleInputChange(event, 'gallery')}
      />

      <input
        ref={cameraInputRef}
        type="file"
        accept="image/*"
        capture="environment"
        className="hidden"
        aria-label={copy.takePhoto}
        onChange={(event) => handleInputChange(event, 'camera')}
      />
    </>
  )

  if (selectedImage) {
    return (
      <div className="rounded-[22px] border border-[#DDE8E1] bg-white p-3 shadow-sm">
        <div className="overflow-hidden rounded-[18px] border border-[#DDE8E1]">
          <img
            src={selectedImage}
            alt={copy.selectedImageAlt}
            className="h-64 w-full object-contain bg-[#F3FBF7]"
          />
        </div>

        <p className="mt-3 text-center text-sm text-[#66736C]">
          {language === 'te'
            ? 'చిత్రాన్ని పరిశీలించి కొనసాగించండి'
            : 'Review your photo before continuing'}
        </p>

        <div className="mt-4 flex gap-3">
          <Button
            variant="secondary"
            className="flex-1"
            onClick={() => cameraInputRef.current?.click()}
          >
            <RotateCcw className="mr-2 h-4 w-4" />
            {language === 'te' ? 'మళ్లీ ఫోటో తీయండి' : 'Retake'}
          </Button>
<button
  type="button"
  onClick={onRemove}
  className="mt-3 w-full rounded-xl border border-[#DDE8E1] px-4 py-3 text-sm font-medium text-[#66736C] hover:bg-[#F3FBF7]"
>
  {language === 'te' ? 'చిత్రాన్ని తొలగించండి' : 'Remove Photo'}
</button>
          <Button className="flex-1" onClick={onUpload}>
            {copy.upload}
          </Button>
        </div>

        {imageInput}
      </div>
    )
  }

  return (
    <div
      onDragOver={(event) => {
        event.preventDefault()
        setIsDragActive(true)
      }}
      onDragLeave={() => setIsDragActive(false)}
      onDrop={onDrop}
      className={[
        'rounded-[24px] border-2 border-dashed border-[#7BC7A3] bg-[#F3FBF7] p-6 text-center transition-all',
        isDragActive ? 'border-[#0B8F5A] bg-[#EAF8F1] shadow-md' : '',
      ].join(' ')}
    >
      <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-white text-[#0B8F5A] shadow-sm">
        <CloudUpload className="h-9 w-9" />
      </div>

      <div className="mt-5 space-y-2 text-[#17211C]">
        <p className="text-xl font-semibold">
          {isDragActive ? copy.dropImage : copy.uploadClearImage}
        </p>
        <p className="text-sm text-[#66736C]">{copy.dragDrop}</p>
      </div>

      <div className="mt-5 flex flex-col gap-3">
        <Button
          className="mx-auto w-full"
          onClick={() => galleryInputRef.current?.click()}
        >
          <ImagePlus className="mr-2 h-4 w-4" />
          {copy.chooseImage}
        </Button>

        <Button
          variant="secondary"
          className="mx-auto w-full"
          onClick={() => cameraInputRef.current?.click()}
        >
          <Camera className="mr-2 h-4 w-4" />
          {copy.takePhoto}
        </Button>
      </div>

      {imageInput}
    </div>
  )
}
