import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
// import CryptoContext from './CryptoContext';
// import reportWebVitals from './reportWebVitals';
import { CryptoProvider } from './Components/MarketComponents/CryptoContext';
import { StorageProvider } from './Components/MarketComponents/StorageContext';
// import { CryptoNewsProvider } from './Components/MarketComponents/CryptoNewsContext';
import { TotalProvider } from './Components/MarketComponents/TotalContext';
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <CryptoProvider>
      <StorageProvider>
        <TotalProvider>
      {/* <CryptoNewsProvider> */}
    {/* <CryptoContext> */}
    <App />
    {/* </CryptoContext> */}
 {/* </CryptoNewsProvider> */}
  </TotalProvider>
    </StorageProvider>
    </CryptoProvider>
  </React.StrictMode>

);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
// reportWebVitals();
