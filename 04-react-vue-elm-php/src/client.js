// REACT
import React from 'react';
import { hydrate } from 'react-dom';
import BrowserRouter from 'react-router-dom/BrowserRouter';
// REACT AND VUE FROM THE SAME FILE!
import App, { createVueApp } from './App';
import Elm from './Main'; // Import ELM

// VUE
const { app } = createVueApp();
app.$mount('#vue');

// REACT
// Expose React to PHP code.
window.React = React;
hydrate(
  <BrowserRouter>
    <App />
  </BrowserRouter>,
  document.getElementById('react')
);

// ELM
Elm.Main.embed(document.getElementById('elm'));

if (module.hot) {
  module.hot.accept();
}
