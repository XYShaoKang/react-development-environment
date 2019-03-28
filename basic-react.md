# React 基础环境配置

## 新建文件夹 初始化项目

```sh
mkdir dev-env && cd dev-env && yarn init -y
```

## 安装依赖

```sh
yarn add -D @babel/cli @babel/core @babel/preset-env @babel/preset-react babel-loader css-loader html-webpack-plugin style-loader webpack webpack-cli webpack-dev-server

yarn add react @hot-loader/react-dom react-hot-loader
```

### 使用 @hot-loader/react-dom

[React-🔥-dom](https://github.com/gaearon/react-hot-loader#react--dom)

不使用补丁的话,控制台会提示
`react-🔥-dom patch is not detected. React 16.6+ features may not work.`

## babel 配置

```js
// babel.config.js
module.exports = {
  presets: ['@babel/preset-react', '@babel/preset-env'],
  plugins: ['react-hot-loader/babel'],
}
```

## webpack 配置

```js
// webpack.config.js
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
          test: /\.css?$/,
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
          ],
        },
      ],
    },
    mode: dev ? 'development' : prod ? 'production' : 'none',
  }
}
```

## 项目文件

```js
// src/index.js
import React from 'react'
import { render } from 'react-dom'
import App from './App'

let root = document.getElementById('root')
if (!root) {
  root = document.createElement('div')
  root.id = 'root'
  document.body.insertBefore(root, document.body.firstChild)
}

render(<App />, root)

// src/App.js
import React, { Component } from 'react'
import { hot } from 'react-hot-loader/root'

import style from './App.css'

class App extends Component {
  render() {
    return (
      <div className={style.app}>
        <h1>This is React App</h1>
      </div>
    )
  }
}
export default hot(App)
```

```css
/* App.css */
.app {
  width: 300px;
  height: 300px;
  color: #64d;
  background: #eb7;
  text-align: center;
  line-height: 300px;
}
```

## 启动脚本

```json
// package.json
{
  "scripts": {
    "start": "webpack-dev-server --open --env.dev",
    "watch": "webpack --watch",
    "build": "webpack --env.prod"
  }
}
```
