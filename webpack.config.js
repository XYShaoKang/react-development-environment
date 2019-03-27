const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')

module.exports = env => {
  const dev = env && env.dev
  const prod = env && env.prod
  return {
    entry: './src/index.js',
    devtool: dev && 'inline-source-map',
    plugins: [
      new HtmlWebpackPlugin({
        title: 'React Demo',
      }),
    ],
    output: {
      filename: 'bundle.js',
      path: path.resolve(__dirname, 'dist'),
    },
    module: {
      rules: [
        {
          test: /\.jsx?$/,
          exclude: /(node_modules|bower_components)/,
          use: { loader: 'babel-loader' },
        },
      ],
    },
    mode: dev ? 'development' : prod ? 'production' : 'none',
  }
}
