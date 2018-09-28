import React, { Component } from 'react'
import styled from 'styled-components'

import socket from './socket'
import Header from './Components/Header'
import Root from './Factory'

class App extends Component {
  state = {
    factories: [],
    dialogOpen: false
  }
  componentWillMount () {
    socket.emit('allFactories')
    socket.on('allFactories', factories => {
      this.setState({ factories })
    })
    socket.on('removeFactory', response => {
      const factories = [...this.state.factories].filter(
        item => item._id !== response
      )
      this.setState({ factories })
    })
    socket.on('addFactory', response => {
      this.setState({ factories: [...this.state.factories, response] })
    })
    socket.on('updateFactory', response => {
      const allFactories = [...this.state.factories]
      allFactories.splice(
        allFactories.findIndex(factory => factory._id === response._id),
        1,
        response
      )
      this.setState({
        factories: allFactories
      })
    })
    socket.on('Error', response => console.log(response))
  }
  handleClickOpen = () => {
    this.setState({ dialogOpen: true })
  }
  handleClose = () => {
    this.setState({ dialogOpen: false })
  }
  render () {
    return (
      <div>
        <Header handleClickOpen={this.handleClickOpen} />
        <Container>
          <Root
            dialogOpen={this.state.dialogOpen}
            handleClose={this.handleClose}
            factories={this.state.factories}
          />
        </Container>
      </div>
    )
  }
}
const Container = styled.div`
  margin: 0 3rem;
  border-left: 2px dashed;

  @media(max-width: 900px) {
    margin: 0;
  }
`
export default App
