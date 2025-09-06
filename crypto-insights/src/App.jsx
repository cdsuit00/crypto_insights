import { useState, useEffect } from 'react'
import { Routes, Route, Link } from 'react-router-dom'
import Home from './pages/Home'
import CoinDetails from './pages/CoinDetails'

export default function App() {
  const [theme, setTheme] = useState('dark')

  // Load saved theme or system preference
  useEffect(() => {
    const saved = localStorage.getItem('theme')
    if (saved) {
      setTheme(saved)
    } else {
      const prefersDark = window.matchMedia &&
        window.matchMedia('(prefers-color-scheme: dark)').matches
      setTheme(prefersDark ? 'dark' : 'light')
    }
  }, [])

  // Apply theme to <body> and persist
  useEffect(() => {
    document.body.dataset.theme = theme
    localStorage.setItem('theme', theme)
  }, [theme])

  const toggleTheme = () => {
    setTheme(prev => (prev === 'dark' ? 'light' : 'dark'))
  }

  return (
    <div className="app">
      <header className="app-header">
        <Link to="/" className="brand">Crypto Insights</Link>
        <button className="theme-toggle" onClick={toggleTheme}>
          {theme === 'dark' ? '🌞 Light' : '🌙 Dark'}
        </button>
      </header>

      <main className="container">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/coin/:id" element={<CoinDetails />} />
        </Routes>
      </main>

      <footer className="footer">Built with CoinLore API</footer>
    </div>
  )
}
