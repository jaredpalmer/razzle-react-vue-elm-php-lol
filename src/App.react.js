import React from 'react';
import Route from 'react-router-dom/Route';
import Switch from 'react-router-dom/Switch';
import logo from './react.svg';
import './App.css';

const App = () => (
  <Switch>
    <Route
      exact
      path="/"
      render={() => (
        <div className="Home">
          <div className="Home-header">
            <img src={logo} className="Home-logo" alt="logo" />
            <h1>This is some React Code!</h1>
          </div>
        </div>
      )}
    />
  </Switch>
);

export default App;
