// REACT
import React from 'react';
import { hydrate } from 'react-dom';
import BrowserRouter from 'react-router-dom/BrowserRouter';

// REACT AND VUE FROM THE SAME FILE!
import App, { createVueApp } from './App';

// VUE
const { app } = createVueApp();
app.$mount('#vue');

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
