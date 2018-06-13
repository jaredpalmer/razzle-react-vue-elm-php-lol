const makeLoaderFinder = require('razzle-dev-utils/makeLoaderFinder');
const VueLoaderPlugin = require('vue-loader/lib/plugin');

module.exports = {
  modify(config, { target, dev }) {
    const appConfig = config;
    // Vue
    appConfig.resolve.extensions = [
      ...appConfig.resolve.extensions,
      '.vue',
      '.tsx',
    ];
    appConfig.resolve.alias = Object.assign({}, appConfig.resolve.alias, {
      vue$: 'vue/dist/vue.esm.js',
    });

    const cssLoaderFinder = makeLoaderFinder('css-loader');
    appConfig.module.rules = appConfig.module.rules.filter(
      rule => !cssLoaderFinder(rule)
    );
    appConfig.module.rules.push({
      test: /\.vue$/,
      loader: 'vue-loader',
    });

    appConfig.module.rules[0] = {
      test: /\.css$/,
      use: [require.resolve('vue-style-loader'), require.resolve('css-loader')],
    };

    appConfig.plugins.push(new VueLoaderPlugin());

    // ELM
    appConfig.module.rules[2].exclude.push(/\.(elm)$/);

    appConfig.module.noParse = [/.elm$/];
    appConfig.resolve.extensions = config.resolve.extensions.concat(['.elm']);

    if (dev) {
      appConfig.module.rules.push({
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
      appConfig.module.rules.push({
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

    return appConfig;
  },
};
