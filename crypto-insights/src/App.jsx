import { Routes, Route, Link } from 'react-router-dom'
import Home from './pages/Home'
import CoinDetails from './pages/CoinDetails'

export default function App() {
  return (
    <div className="app">
      <header className="app-header">
        <Link to="/" className="brand">Crypto Insights</Link>
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
