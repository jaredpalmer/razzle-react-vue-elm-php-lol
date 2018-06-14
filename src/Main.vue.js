import Vue from 'vue';
import App from './App.vue';

// export a factory function for creating fresh app, router and store
// instances
export function createVueApp() {
  const app = new Vue({
    // the root instance simply renders the App component.
    render: h => h(App),
  });

  return { app };
}
