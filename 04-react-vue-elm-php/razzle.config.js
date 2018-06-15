'use strict';

const makeLoaderFinder = require('razzle-dev-utils/makeLoaderFinder');
const VueLoaderPlugin = require('vue-loader/lib/plugin');

module.exports = {
  modify(config, { dev }) {
    // -----
    // BABEL PHP WHAT'S GOOD?!?!?!?!?
    // -----
    config.resolve.extensions.push('.php');

    // Exclude from file-loader
    config.module.rules[
      config.module.rules.findIndex(makeLoaderFinder('file-loader'))
    ].exclude.push(/\.(php)$/);

    // Don't parse as JS
    config.module.noParse = config.module.noParse
      ? config.module.noParse.concat([/.php$/])
      : [/.php$/];

    // Add a custom babel loader (in addition to the one for .js)
    // making sure to ignore .babelrc
    config.module.rules.push({
      test: /\.php$/,
      include: config.module.rules.find(
        makeLoaderFinder('babel-loader')
      ).include,
      use: [
        {
          loader: 'babel-loader',
          options: {
            presets: [require.resolve('babel-preset-php')],
            babelrc: false,
          },
        },
      ],
    });

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

    config.module.rules.push({
      test: /\.css$/,
      use: [
        require.resolve('vue-style-loader'),
        require.resolve('css-loader'),
      ],
    });

    config.plugins.push(new VueLoaderPlugin());

    // -----
    // ELM
    // -----
    config.module.noParse.concat([/.elm$/]);

    config.module.rules[
      config.module.rules.findIndex(makeLoaderFinder('file-loader'))
    ].exclude.push(/\.(elm)$/);

    config.resolve.extensions.push('.elm');

    if (dev) {
      config.module.rules.push({
        test: /\.elm$/,
        exclude: [/elm-stuff/, /node_modules/],
        use: [
          // {
          //   loader: 'elm-hot-loader',
          // },
          {
            loader: 'elm-webpack-loader',
            options: {
              verbose: true,
              warn: true,
              pathToMake: require('elm/platform').executablePaths[
                'elm-make'
              ],
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
              pathToMake: require('elm/platform').executablePaths[
                'elm-make'
              ],
            },
          },
        ],
      });
    }
    // remove eslint
    config.module.rules = config.module.rules.filter(
      rule => !makeLoaderFinder('eslint-loader')(rule)
    );

    return config;
  },
};
