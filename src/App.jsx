import { BrowserRouter, Route, Routes } from 'react-router-dom'
import LandingPage from './pages/LandingPage.jsx'
import PrivacyPage from './pages/PrivacyPage.jsx'
import CostCalculatorPage from './pages/CostCalculatorPage.jsx'

export default function App() {
  return (
    <BrowserRouter
      future={{
        v7_relativeSplatPath: true,
        v7_startTransition: true,
      }}
    >
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/privacy" element={<PrivacyPage />} />
        <Route path="/tools/cost-calculator" element={<CostCalculatorPage />} />
      </Routes>
    </BrowserRouter>
  )
}
