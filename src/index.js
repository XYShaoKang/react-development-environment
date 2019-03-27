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
