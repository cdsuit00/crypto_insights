import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const CryptoList = () => {
  const [cryptos, setCryptos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCryptos = async () => {
      try {
        setLoading(true);
        const response = await fetch('https://api.coinlore.net/api/tickers/');
        if (!response.ok) {
          throw new Error('Failed to fetch data');
        }
        const data = await response.json();
        // Get top 10 cryptocurrencies
        setCryptos(data.data.slice(0, 10));
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchCryptos();
  }, []);

  if (loading) {
    return <div className="loading">Loading cryptocurrencies...</div>;
  }

  if (error) {
    return <div className="error">Error: {error}</div>;
  }

  return (
    <div className="crypto-list">
      <h2>Top 10 Cryptocurrencies</h2>
      <div className="crypto-grid">
        {cryptos.map(crypto => (
          <div key={crypto.id} className="crypto-card">
            <Link to={`/crypto/${crypto.id}`}>
              <h3>{crypto.name} ({crypto.symbol})</h3>
              <p>Rank: #{crypto.rank}</p>
              <p>Price: ${parseFloat(crypto.price_usd).toFixed(2)}</p>
              <p className={parseFloat(crypto.percent_change_24h) >= 0 ? 'positive' : 'negative'}>
                24h Change: {crypto.percent_change_24h}%
              </p>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CryptoList;