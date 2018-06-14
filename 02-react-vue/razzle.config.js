'use strict';

const makeLoaderFinder = require('razzle-dev-utils/makeLoaderFinder');
const VueLoaderPlugin = require('vue-loader/lib/plugin');

module.exports = {
  modify(config) {
    // -----
    // VUE
    // -----
    config.resolve.extensions = [...config.resolve.extensions, '.vue'];
    config.resolve.alias = Object.assign({}, config.resolve.alias, {
      vue$: 'vue/dist/vue.esm.js',
    });

    config.module.rules = config.module.rules.filter(
      rule => !makeLoaderFinder('css-loader')(rule)
    );
    config.module.rules.push({
      test: /\.vue$/,
      loader: 'vue-loader',
    });

    config.module.rules[0] = {
      test: /\.css$/,
      use: [require.resolve('vue-style-loader'), require.resolve('css-loader')],
    };

    config.plugins.push(new VueLoaderPlugin());

    return config;
  },
};
