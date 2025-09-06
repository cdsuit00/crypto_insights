import { useEffect, useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import Loading from '../components/Loading'

const API_BASE = 'https://api.coinlore.net/api'

export default function CoinDetails() {
  const { id } = useParams()
  const [coin, setCoin] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    const ctrl = new AbortController()
    async function load() {
      setLoading(true); setError(null)
      try {
        const res = await fetch(`${API_BASE}/ticker/?id=${id}`, { signal: ctrl.signal })
        if (!res.ok) throw new Error(`API error ${res.status}`)
        const json = await res.json()
        if (!Array.isArray(json) || json.length === 0) throw new Error('No data available')
        setCoin(json[0])
      } catch (err) {
        if (err.name !== 'AbortError') setError(err.message)
      } finally {
        setLoading(false)
      }
    }
    load()
    return () => ctrl.abort()
  }, [id])

  if (loading) return <Loading message="Loading coin details..." />
  if (error) return <div className="error">Error: {error} <button onClick={() => window.location.reload()}>Retry</button></div>

  const {
    name, symbol, price_usd, percent_change_1h, percent_change_24h, percent_change_7d,
    market_cap_usd, volume24, csupply, tsupply, msupply, rank
  } = coin || {}

  return (
    <article className="coin-details">
      <Link to="/" className="back">← Back</Link>
      <h1>{name} <small>({symbol})</small></h1>
      <p className="meta">Rank #{rank}</p>

      <div className="stats-grid">
        <div><strong>Price</strong><div>${Number(price_usd).toLocaleString()}</div></div>
        <div><strong>Change (1h)</strong><div>{percent_change_1h}%</div></div>
        <div><strong>Change (24h)</strong><div>{percent_change_24h}%</div></div>
        <div><strong>Change (7d)</strong><div>{percent_change_7d}%</div></div>
        <div><strong>Market Cap</strong><div>${Number(market_cap_usd).toLocaleString()}</div></div>
        <div><strong>24h Volume</strong><div>${Number(volume24).toLocaleString()}</div></div>
        <div><strong>Circulating</strong><div>{csupply}</div></div>
        <div><strong>Total Supply</strong><div>{tsupply || '—'}</div></div>
        <div><strong>Max Supply</strong><div>{msupply || '—'}</div></div>
      </div>
    </article>
  )
}
