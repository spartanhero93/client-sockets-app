import React, { Component } from 'react'
import styled from 'styled-components'
import Button from '@material-ui/core/Button'
import { withStyles } from '@material-ui/core/styles'
import socket from './socket'
import Root from './Components/Factory'

const styles = theme => ({
  button: {
    margin: theme.spacing.unit
  },
  input: {
    display: 'none'
  }
})

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
    const { classes } = this.props
    return (
      <Wrapper>
        <Button
          onClick={this.handleClickOpen}
          variant='outlined'
          color='primary'
          className={classes.button}
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
`

export default withStyles(styles)(App)
