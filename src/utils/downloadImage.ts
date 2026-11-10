export function downloadImage(imageUrl: string, fileName: string) {
  const link = document.createElement('a')
  link.href = imageUrl
  link.download = fileName
  link.rel = 'noopener'
  document.body.appendChild(link)
  link.click()
  link.remove()
}
