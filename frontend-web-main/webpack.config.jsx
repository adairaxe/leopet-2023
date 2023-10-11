const path = require('path');

const packageJson = require('./package.json');

const PATHS = {
  app: path.join(__dirname, 'src'),
  build: path.join(__dirname, 'dist/dev'),
};

module.exports = {
  context: PATHS.app,
  entry: [path.join(PATHS.app, 'index.js')],
  output: {
    path: PATHS.build,
    library: packageJson.name,
    libraryTarget: 'umd',
    umdNamedDefine: true,
    filename: `${packageJson.name.toLowerCase()}.${packageJson.version}.js`,
  },
  module: {
    rules: [
      {
        enforce: 'pre',
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'eslint-loader',
        options: {
          failOnError: true,
          fix: true,
        },
      },
      {
        test: /\.js$/,
        exclude: [/node_modules/, /\.worker\.js$/],
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env', '@babel/preset-react'],
            plugins: [
              '@babel/plugin-proposal-optional-chaining',
              '@babel/plugin-proposal-class-properties',
            ],
          },
        },
      },
      {
        test: /\.(sa|sc|c)ss$/,
        exclude: /node_modules/,
        use: [
          'style-loader',
          'css-loader',
          {
            loader: 'postcss-loader',
            options: {
              config: {
                path: path.resolve(__dirname, 'postcss.config.js'),
              },
            },
          },
          'sass-loader',
        ],
      },
      {
        test: /\.css$/,
        include: /node_modules/,
        exclude: PATHS.app,
        use: ['style-loader', 'css-loader'],
      },
      {
        test: /\.(jpg|png|svg)$/,
        use: {
          loader: 'url-loader',
          options: {
            limit: 50000,
          },
        },
      },
      {
        test: /\.ttf$/,
        use: {
          loader: 'ttf-loader',
        },
      },
    ],
  },
  stats: {
    children: false,
  },
};
