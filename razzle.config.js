const makeLoaderFinder = require('razzle-dev-utils/makeLoaderFinder');
const VueLoaderPlugin = require('vue-loader/lib/plugin');

module.exports = {
  modify(config, { target, dev }) {
    const appConfig = config;
    // Vue
    appConfig.resolve.extensions = [...appConfig.resolve.extensions, '.vue'];
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

    appConfig.module.noParse.push([/.elm$/]);

    appConfig.module.rules[2].exclude.push(/\.(elm)$/);

    appConfig.resolve.extensions = config.resolve.extensions.push('.elm');

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

    // BABEL PHP WHAT'S GOOD?!?!?!?!?
    appConfig.resolve.extensions = config.resolve.extensions.concat(['.php']);
    appConfig.module.rules[2].exclude.push(/\.(php)$/);
    appConfig.module.noParse.push(/.php$/);

    const babelLoaderFinder = makeLoaderFinder('babel-loader');
    const babelLoader = appConfig.module.rules.find(babelLoaderFinder);
    appConfig.module.rules.push({
      test: /\.php$/,
      include: babelLoader.include,
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
    if (target === 'web') {
      appConfig.externals = {
        // react: {
        //   root: 'React',
        //   commonjs2: 'react',
        //   commonjs: 'react',
        //   amd: 'react',
        //   umd: 'react',
        // },
        // 'react-dom': {
        //   root: 'ReactDOM',
        //   commonjs2: 'react-dom',
        //   commonjs: 'react-dom',
        //   amd: 'react-dom',
        //   umd: 'react-dom',
        // },
      };
    }

    return appConfig;
  },
};
