const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')

module.exports = env => {
  const dev = env && env.dev
  const prod = env && env.prod
  return {
    entry: './src/index.js',
    devtool: dev && 'cheap-module-eval-source-map',
    devServer: {
      hot: true,
    },
    plugins: [
      new HtmlWebpackPlugin({
        title: 'React Demo',
      }),
    ],
    output: {
      filename: 'bundle.js',
      path: path.resolve(__dirname, 'dist'),
    },
    resolve: {
      alias: {
        'react-dom': '@hot-loader/react-dom',
      },
    },
    module: {
      rules: [
        {
          test: /\.jsx?$/,
          exclude: /(node_modules|bower_components)/,
          use: { loader: 'babel-loader' },
        },
        {
          test: /\.less$/,
          loader: [
            {
              loader: 'style-loader',
              options: {
                sourceMap: dev,
                convertToAbsoluteUrls: dev,
              },
            },
            {
              loader: 'css-loader',
              options: {
                modules: true,
                sourceMap: dev,
              },
            },
            {
              loader: 'less-loader',
              options: {
                sourceMap: dev,
              },
            },
          ],
        },
      ],
    },
    mode: dev ? 'development' : prod ? 'production' : 'none',
  }
}
