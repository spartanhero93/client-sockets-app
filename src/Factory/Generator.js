import React, { Component } from 'react'
import styled from 'styled-components'
import { withStyles } from '@material-ui/core/styles'
import Button from '@material-ui/core/Button'
import socket from '../socket'
import FactoryMenu from './FactoryMenu'
const styles = theme => ({
  button: {
    margin: theme.spacing.unit
  },
  input: {
    display: 'none'
  }
})
class FactoryGeneration extends Component {
  state = {
    anchor: null,
    textInput: '',
    currentFactory: {}
  }
  handleClick = event => {
    this.setState({ anchor: event.currentTarget })
  }
  handleClose = () => {
    this.setState({ anchor: null })
  }
  currentFactory = currentFactory => {
    this.setState({ currentFactory })
  }
  removeFactory = id => {
    socket.emit('removeFactory', id)
  }
  updateFactory = _id => {
    const newChanges = {
      name: this.state.textInput
    }
    const newFactory = Object.assign({}, this.state.currentFactory)
    socket.emit('updateFactory', newFactory)
  }
  render () {
    const { factories, classes } = this.props
    // console.log('Factory generator component: ', this.state.currentFactory)
    return (
      /**
      * React.Fragment added to prevent the FactoryMenu
      * from not being able to know which component it lied in
      */
      (
        <Wrapper>
          {factories.map((item, index) => (
            <React.Fragment key={item._id}>
              <div onClick={() => this.currentFactory(item)}>
                <ul>
                  <li>
                    <div>
                      {item.name}
                      <Button
                        aria-owns={this.state.anchor ? 'simple-menu' : null}
                        aria-haspopup='true'
                        onClick={this.handleClick}
                        variant='outlined'
                        color='primary'
                        className={classes.button}
                      >
                        Modify
                      </Button>
                    </div>
                    <ul>
                      {item.children.map((item, index) => (
                        <li key={index}>{item}</li>
                      ))}
                    </ul>
                  </li>
                </ul>
              </div>
              <FactoryMenu
                item={this.state.currentFactory}
                anchor={this.state.anchor}
                updateFactory={this.updateFactory}
                handleClose={this.handleClose}
                removeFactory={this.removeFactory}
              />
            </React.Fragment>
          ))}

        </Wrapper>
      )
    )
  }
}
const Wrapper = styled.div`
  text-align:left;

  ul {
    border: solid 2px;
    li {
      padding-left: 1rem;
    }
  }
`
export default withStyles(styles)(FactoryGeneration)
