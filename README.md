Crypto Insights<br><br>
A simple React single-page application (SPA) that gives users quick insights into the top 10 cryptocurrencies using the CoinLore API.
Users can view a summary of prices and market data, as well as click on a coin for more details.
---
Features
  - Top 10 coins by market cap displayed on the home page
  - Each card shows price, 24h change, and market cap
  - Detailed view for each coin (supply, rank, volume, % change over   1h/24h/7d, etc.)
  - Refresh button to fetch updated market data
  - Loading, error, and empty states handled gracefully
  - Light/Dark theme toggle, with user preference saved across  sessions
  - Basic caching to avoid unnecessary API calls

---
Tech Stack
  - React (Vite) — frontend framework
  - React Router — navigation between pages
  - CoinLore API — external data source (no API key required)
  - CSS Variables — theme management (light/dark)

---
Installation & Setup

Clone the repo and install dependencies:

git clone https://github.com/cdsuit00/crypto_insights.git
cd crypto-insights
npm install

Start the development server:
npm run dev

Then open your browser at http://localhost:5173

---
API Endpoints
From CoinLore API

  Top 10 coins
    GET https://api.coinlore.net/api/tickers/?start=0&limit=10

  Coin details by ID
    GET https://api.coinlore.net/api/ticker/?id={ID}

---
Development Notes
  - Error handling: Shows user-friendly messages if API fails.
  - Caching: Top 10 results cached in sessionStorage for 30s to avoid excessive API requests.
  - Accessibility: Button labels and text contrast designed for clarity.
  - Maintainability: Components are separated into pages and components directories.
