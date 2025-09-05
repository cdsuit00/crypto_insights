import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';

const CryptoDetail = () => {
  const { id } = useParams();
  const [crypto, setCrypto] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCryptoDetail = async () => {
      try {
        setLoading(true);
        const response = await fetch(`https://api.coinlore.net/api/ticker/?id=${id}`);
        if (!response.ok) {
          throw new Error('Failed to fetch cryptocurrency details');
        }
        const data = await response.json();
        setCrypto(data[0]);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchCryptoDetail();
  }, [id]);

  if (loading) {
    return <div className="loading">Loading cryptocurrency details...</div>;
  }

  if (error) {
    return <div className="error">Error: {error}</div>;
  }

  if (!crypto) {
    return <div className="error">Cryptocurrency not found</div>;
  }

  return (
    <div className="crypto-detail">
      <Link to="/" className="back-link">← Back to list</Link>
      <div className="detail-card">
        <h2>{crypto.name} ({crypto.symbol})</h2>
        <div className="detail-grid">
          <div className="detail-item">
            <span className="label">Rank:</span>
            <span className="value">#{crypto.rank}</span>
          </div>
          <div className="detail-item">
            <span className="label">Price:</span>
            <span className="value">${parseFloat(crypto.price_usd).toFixed(2)}</span>
          </div>
          <div className="detail-item">
            <span className="label">Market Cap:</span>
            <span className="value">${parseFloat(crypto.market_cap_usd).toLocaleString()}</span>
          </div>
          <div className="detail-item">
            <span className="label">24h Volume:</span>
            <span className="value">${parseFloat(crypto.volume24).toLocaleString()}</span>
          </div>
          <div className="detail-item">
            <span className="label">24h Change:</span>
            <span className={parseFloat(crypto.percent_change_24h) >= 0 ? 'value positive' : 'value negative'}>
              {crypto.percent_change_24h}%
            </span>
          </div>
          <div className="detail-item">
            <span className="label">1h Change:</span>
            <span className={parseFloat(crypto.percent_change_1h) >= 0 ? 'value positive' : 'value negative'}>
              {crypto.percent_change_1h}%
            </span>
          </div>
          <div className="detail-item">
            <span className="label">7d Change:</span>
            <span className={parseFloat(crypto.percent_change_7d) >= 0 ? 'value positive' : 'value negative'}>
              {crypto.percent_change_7d}%
            </span>
          </div>
          <div className="detail-item">
            <span className="label">Total Supply:</span>
            <span className="value">{parseFloat(crypto.tsupply).toLocaleString()} {crypto.symbol}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CryptoDetail;