import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.scss';
import { setupStore } from './store/store';
import { Provider } from 'react-redux';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/home/Home';
import BlockchainExplrorer from './pages/blockchain_explorer/BlockchainExplrorer';
import Nft from './pages/nft/Nft';
import Nfts from './pages/nfts/Nfts';
import CoinOverView from './pages/coinoverview/CoinOverView';
import Watchlist from './pages/watchlist/Watchlist';
import News from './pages/news/News';
import Portfolio from './pages/portfolio/Portfolio';
import Exchanges from './pages/exchanges/Exchanges';
import Cabinet from './pages/cabinet/Cabinet';
import { AppProvider } from './app-provider/AppProvider';
import TrendingCoins from './pages/trendingcoins/TrendingCoins';
import GainersAndLosers from './pages/gainersandlosers/GainersAndLosers';

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);
root.render(
  <React.StrictMode>
    <Provider store={setupStore()}>
      <AppProvider>
        <Router>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/myoracle" element={<Home />} />
            <Route path="/currencies/:id/" element={<CoinOverView />} />
            <Route path="/blockchain_explorer" element={<BlockchainExplrorer />} />
            <Route path="/nfts" element={<Nfts />} />
            <Route path="/nfts/:name/" element={<Nft />} />
            <Route path="/news" element={<News />} />
            <Route path="/watchlist" element={<Watchlist />} />
            <Route path="/portfolio-tracker/" element={<Portfolio />} />
            <Route path="/exchanges/dex" element={<Exchanges />} />
            <Route path="/cabinet" element={<Cabinet />} />
            <Route path="/trending" element={<TrendingCoins />} />
            <Route path="/gainers&losers" element={<GainersAndLosers />} />
          </Routes>
        </Router>
      </AppProvider>
    </Provider>
  </React.StrictMode>,
);
