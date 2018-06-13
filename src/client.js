import { createVueApp } from './Main.vue.js';
import React from 'react';
import { hydrate } from 'react-dom';
import App from './App.react';
import BrowserRouter from 'react-router-dom/BrowserRouter';
const Elm = require('./Main');

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

// ELM
Elm.Main.embed(document.getElementById('elm'));

if (module.hot) {
  module.hot.accept();
}
