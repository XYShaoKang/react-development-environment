import React, { Component } from 'react'
import { hot } from 'react-hot-loader/root'

import style from './App.less'

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
