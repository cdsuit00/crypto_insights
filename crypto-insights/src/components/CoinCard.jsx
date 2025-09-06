import { Link } from 'react-router-dom'

export default function CoinCard({ coin }) {
  const { id, name, symbol, price_usd, percent_change_24h, market_cap_usd } = coin
  const up = parseFloat(percent_change_24h) >= 0

  return (
    <Link to={`/coin/${id}`} className="card">
      <header className="card-head">
        <div className="title">{name} <small>({symbol})</small></div>
        <div className={`change ${up ? 'pos' : 'neg'}`}>{percent_change_24h}%</div>
      </header>

      <div className="card-body">
        <div className="price">${Number(price_usd).toLocaleString()}</div>
        <div className="mcap">MCap ${Number(market_cap_usd).toLocaleString()}</div>
      </div>
    </Link>
  )
}
