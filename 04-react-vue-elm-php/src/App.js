import './App.css';
import React from 'react';
import Route from 'react-router-dom/Route';
import Switch from 'react-router-dom/Switch';
import logo from './react.svg';
import phpLogo from './php.svg';
import Lol from './Lol.php';
import Vue from 'vue';
import VueApp from './App.vue';

const App = () => (
  <Switch>
    <Route
      exact
      path="/"
      render={() => (
        <React.Fragment>
          <div className="Home">
            <div className="Home-header">
              <img src={logo} className="Home-logo" alt="logo" />
              <h1>This is some React Code!</h1>
            </div>
          </div>
          <Lol src={phpLogo} />
        </React.Fragment>
      )}
    />
  </Switch>
);

export default App;

// export a factory function for creating fresh app, router and store
// instances
export function createVueApp() {
  const app = new Vue({
    // the root instance simply renders the App component.
    render: h => h(VueApp),
  });

  return { app };
}
