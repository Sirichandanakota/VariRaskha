
import { AppProvider } from './context/AppContext'
import { MobileMenu } from './components/MobileMenu'
import { AppRoutes } from './routes/AppRoutes'

function AppShell() {
  return (
    <div className="min-h-screen bg-[#F4F9F5] text-[#17211C]">
      <AppRoutes />
      <MobileMenu />
    </div>
  )
}

export default function App() {
  return (
    <AppProvider>
      <AppShell />
    </AppProvider>
  )
}
