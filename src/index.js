import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import './styles/utility.css'
import App from './App';

import {  BroProvider } from './context/brocon';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <BroProvider>
    <App />
    </BroProvider>
    
  </React.StrictMode>
);


