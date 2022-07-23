import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import './index.css';
import App from './components/App';
import reportWebVitals from './reportWebVitals';
import AuthWrapper from './components/AuthWrapper';
import { I18nProvider } from './i18n';

ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
      <AuthWrapper>
        <I18nProvider>
          <HelmetProvider>
            <App />
          </HelmetProvider>
        </I18nProvider>
      </AuthWrapper>
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
