import { useEffect, useState, useCallback } from 'react'
import CoinCard from '../components/CoinCard'
import Loading from '../components/Loading'

const API_BASE = 'https://api.coinlore.net/api'

export default function Home() {
  const [coins, setCoins] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  const fetchCoins = useCallback(async () => {
    setLoading(true); setError(null)
    try {
      // simple client-side caching (avoid re-querying too frequently)
      const cacheKey = 'coins_top10_v1'
      const cached = sessionStorage.getItem(cacheKey)
      if (cached) {
        const { ts, data } = JSON.parse(cached)
        if (Date.now() - ts < 30_000) { // 30s cache
          setCoins(data)
          setLoading(false)
          return
        }
      }

      const res = await fetch(`${API_BASE}/tickers/?start=0&limit=10`)
      if (!res.ok) throw new Error(`API error ${res.status}`)
      const json = await res.json()
      if (!json || !Array.isArray(json.data)) throw new Error('Unexpected response')
      setCoins(json.data)
      sessionStorage.setItem(cacheKey, JSON.stringify({ ts: Date.now(), data: json.data }))
    } catch (err) {
      setError(err.message || 'Unknown error')
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => { fetchCoins() }, [fetchCoins])

  if (loading) return <Loading message="Loading top 10 cryptocurrencies..." />
  if (error) return (
    <div className="error">
      <p>Error fetching coins: {error}</p>
      <button onClick={fetchCoins}>Retry</button>
    </div>
  )
  if (!coins.length) return <div>No coins found.</div>

  return (
    <section>
      <div className="controls">
        <button onClick={fetchCoins}>Refresh</button>
        <small>Updated now • showing top 10 by market cap</small>
      </div>

      <div className="grid">
        {coins.map(c => <CoinCard key={c.id} coin={c} />)}
      </div>
    </section>
  )
}
