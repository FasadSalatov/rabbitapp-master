import React, { Suspense, lazy, useEffect } from 'react';
import { TonConnectUIProvider } from '@tonconnect/ui-react';
import ReactDOM from 'react-dom/client';
import './index.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

// Импортируем WebApp SDK
const tg = window.Telegram.WebApp;

// Динамический импорт компонентов
const Main = lazy(() => import('./pages/main.js'));
const Upgrade = lazy(() => import('./pages/upgrade.js'));
const Friends = lazy(() => import('./pages/friends.js'));
const Tasks = lazy(() => import('./pages/tasks.js'));
const Clancreate = lazy(() => import('./pages/createclan.js'));
const Nft = lazy(() => import('./pages/nft.js'));
const Claninfo = lazy(() => import('./pages/claninfo.js'));

const App = () => {


  return (
    <TonConnectUIProvider manifestUrl="https://jettocoinwebapp.vercel.app/tonconnect-manifest.json">
      <Suspense fallback={<div className="mainload"></div>}>
        <Routes>
          <Route path="/" element={<Main />} />
          <Route path="/upg" element={<Upgrade />} />
          <Route path="/tasks" element={<Tasks />} />
          <Route path="/friends" element={<Friends />} />
          <Route path="/clancreate" element={<Clancreate />} />
          <Route path="/nft" element={<Nft />} />
          <Route path="/claninfo" element={<Claninfo />} />
        </Routes>
      </Suspense>
    </TonConnectUIProvider>
  );
};

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </React.StrictMode>
);
