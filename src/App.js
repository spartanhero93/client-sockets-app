import React, { Component } from 'react'
import styled from 'styled-components'
import Button from '@material-ui/core/Button'

import socket from './socket'
import CreateNewFactory from './Factory/CreateNewFactory'
import Generator from './Factory/Generator'

// const styles = theme => ({
//   button: {
//     margin: theme.spacing.unit
//   },
//   input: {
//     display: 'none'
//   }
// })

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
      console.log('factory was updated ', response)
    })
  }
  handleClickOpen = () => {
    this.setState({ dialogOpen: true })
  }
  handleClose = () => {
    this.setState({ dialogOpen: false })
  }
  render () {
    // const { classes } = this.props
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
        <CreateNewFactory
          dialogOpen={this.state.dialogOpen}
          handleClose={this.handleClose}
        />
        <Generator factories={this.state.factories} />
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
