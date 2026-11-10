import { Navigate, Route, Routes, useLocation } from 'react-router-dom'
import { AnimatePresence } from 'framer-motion'
import { LanguagePage } from '../pages/LanguagePage'
import { HomePage } from '../pages/HomePage'
import { ImagePreviewPage } from '../pages/ImagePreviewPage'
import { AnalysisPage } from '../pages/AnalysisPage'
import { ResultPage } from '../pages/ResultPage'
import { DiseaseLibraryPage } from '../pages/DiseaseLibraryPage'
import { DiseaseDetailsPage } from '../pages/DiseaseDetailsPage'
import { AboutPage } from '../pages/AboutPage'
import { CropNotDetectedPage } from '../pages/CropNotDetectedPage'
import { LowConfidencePage } from '../pages/LowConfidencePage'
import { HistoryPage } from '../pages/HistoryPage'
import { HistoryDetailPage } from '../pages/HistoryDetailPage'
import { useAppContext } from '../context/AppContext'

export function AppRoutes() {
  const location = useLocation()
  const { language } = useAppContext()

  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        <Route path="/language" element={<LanguagePage />} />
        <Route path="/history" element={<HistoryPage />} />
        <Route path="/history/:id" element={<HistoryDetailPage />} />
        <Route path="/home" element={<HomePage />} />
        <Route path="/preview" element={<ImagePreviewPage />} />
        <Route path="/analyzing" element={<AnalysisPage />} />
        <Route path="/result" element={<ResultPage />} />
        <Route path="/library" element={<DiseaseLibraryPage />} />
        <Route path="/disease/:id" element={<DiseaseDetailsPage />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/crop-not-detected" element={<CropNotDetectedPage />} />
        <Route path="/low-confidence" element={<LowConfidencePage />} />
        <Route path="*" element={<Navigate to={language ? '/home' : '/language'} replace />} />
      </Routes>
    </AnimatePresence>
  )
}
