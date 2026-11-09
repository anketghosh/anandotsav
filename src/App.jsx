import { useEffect } from 'react'
import { Routes, Route, useLocation } from 'react-router-dom'
import Header from './components/Header'
import Footer from './components/Footer'
import { BrandStrip } from './components/AnketBrand'
import { ToastProvider } from './components/Toast'
import Home from './pages/Home'
import FestivalPage from './pages/FestivalPage'
import TemplatesPage from './pages/TemplatesPage'
import Create from './pages/Create'
import { About, Contact, Privacy, NotFound } from './pages/InfoPages'

function ScrollToTop() {
  const { pathname, hash } = useLocation()
  useEffect(() => {
    if (hash) document.getElementById(hash.slice(1))?.scrollIntoView()
    else window.scrollTo(0, 0)
  }, [pathname, hash])
  return null
}

export default function App() {
  return (
    <ToastProvider>
      <ScrollToTop />
      <BrandStrip />
      <Header />
      <main className="min-h-[70vh]">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/templates" element={<TemplatesPage />} />
          <Route path="/festival/:id" element={<FestivalPage />} />
          <Route path="/create/:templateId" element={<Create />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/privacy" element={<Privacy />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>
      <Footer />
    </ToastProvider>
  )
}
