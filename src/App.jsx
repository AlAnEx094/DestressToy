import { useEffect } from 'react'
import { BrowserRouter, Route, Routes, useLocation } from 'react-router-dom'
import LandingPage from './pages/LandingPage.jsx'
import PlushLandingPage from './pages/PlushLandingPage.jsx'
import PrivacyPage from './pages/PrivacyPage.jsx'
import CostCalculatorPage from './pages/CostCalculatorPage.jsx'

function ScrollToHash() {
  const { pathname, hash } = useLocation()

  useEffect(() => {
    if (!hash) return
    const frame = requestAnimationFrame(() => {
      document.getElementById(decodeURIComponent(hash.slice(1)))?.scrollIntoView()
    })
    return () => cancelAnimationFrame(frame)
  }, [pathname, hash])

  return null
}

export default function App() {
  return (
    <BrowserRouter
      future={{
        v7_relativeSplatPath: true,
        v7_startTransition: true,
      }}
    >
      <ScrollToHash />
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/plush" element={<PlushLandingPage />} />
        <Route path="/privacy" element={<PrivacyPage />} />
        <Route path="/calc" element={<CostCalculatorPage />} />
      </Routes>
    </BrowserRouter>
  )
}
