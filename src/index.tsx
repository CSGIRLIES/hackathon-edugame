import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import './index.css';
import './i18n/config.ts';
import App from './App.tsx';
import { UserProvider } from './contexts/UserContext.tsx';

// Restore preferred language from localStorage
const savedLanguage = localStorage.getItem('preferredLanguage');
if (savedLanguage) {
  import('./i18n/config.ts').then(({ default: i18n }) => {
    i18n.changeLanguage(savedLanguage);
    document.documentElement.dir = savedLanguage === 'ar' ? 'rtl' : 'ltr';
  });
}

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <UserProvider>
        <App />
      </UserProvider>
    </BrowserRouter>
  </React.StrictMode>
);
