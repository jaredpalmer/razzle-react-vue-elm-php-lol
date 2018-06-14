'use strict';

const makeLoaderFinder = require('razzle-dev-utils/makeLoaderFinder');
const VueLoaderPlugin = require('vue-loader/lib/plugin');

module.exports = {
  modify(config, { dev }) {
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

    // -----
    // ELM
    // -----
    config.module.noParse = [/.elm$/];

    config.module.rules[2].exclude.push(/\.(elm)$/);

    config.resolve.extensions.push('.elm');

    if (dev) {
      config.module.rules.push({
        test: /\.elm$/,
        exclude: [/elm-stuff/, /node_modules/],
        use: [
          {
            loader: 'elm-hot-loader',
          },
          {
            loader: 'elm-webpack-loader',
            options: {
              verbose: true,
              warn: true,
              pathToMake: require('elm/platform').executablePaths['elm-make'],
              forceWatch: true,
            },
          },
        ],
      });
    } else {
      // Production
      config.module.rules.push({
        test: /\.elm$/,
        exclude: [/elm-stuff/, /node_modules/],
        use: [
          {
            loader: 'elm-webpack-loader',
            options: {
              pathToMake: require('elm/platform').executablePaths['elm-make'],
            },
          },
        ],
      });
    }

    return config;
  },
};
