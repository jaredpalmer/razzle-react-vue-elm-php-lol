import React from 'react';
import { hydrate } from 'react-dom';
import App from './App';
import BrowserRouter from 'react-router-dom/BrowserRouter';

// REACT
hydrate(
  <BrowserRouter>
    <App />
  </BrowserRouter>,
  document.getElementById('react')
);

if (module.hot) {
  module.hot.accept();
}
