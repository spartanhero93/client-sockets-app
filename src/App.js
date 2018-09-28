import React, { Component } from 'react'
import styled from 'styled-components'
import Button from '@material-ui/core/Button'

import socket from './socket'
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
      const allFactories = this.state.factories
      this.setState({
        factories: allFactories.splice(
          allFactories.findIndex(target => target._id === response._id),
          1,
          response
        )
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
      <Wrapper>
        <Button
          onClick={this.handleClickOpen}
          variant='outlined'
          color='primary'
          // className={classes.button}
        >
          New Factory
        </Button>
        <Root
          dialogOpen={this.state.dialogOpen}
          handleClose={this.handleClose}
          factories={this.state.factories}
        />
      </Wrapper>
    )
  }
}
const Wrapper = styled.div`
  margin: 0 8rem;

  @media(max-width: 900px) {
    margin: 0;
  }
`
export default App
