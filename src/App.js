import React, { Component } from 'react'
import { hot } from 'react-hot-loader/root'
import styled from 'styled-components'

const Wrapper = styled.div`
  width: 300px;
  height: 300px;
  color: #64d;
  background: #eb7;
  text-align: center;
  line-height: 300px;
`
class App extends Component {
  render() {
    return (
      <Wrapper>
        <h1>This is React App</h1>
      </Wrapper>
    )
  }
}
export default hot(App)
