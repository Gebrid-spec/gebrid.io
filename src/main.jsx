import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './index.css';

// Hide loader once app boots
const loader = document.getElementById('loading');
if (loader) {
  loader.style.opacity = '0';
  setTimeout(() => loader.remove(), 500);
}

ReactDOM.createRoot(document.getElementById('root')).render(<App />);
