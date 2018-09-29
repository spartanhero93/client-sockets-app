import React, { Component } from 'react'
import styled from 'styled-components'
import { withStyles } from '@material-ui/core/styles'
import Button from '@material-ui/core/Button'
import socket from '../../socket'
import UpdateCurrentFactory from './UpdateCurrentFactory'

const styles = theme => ({
  button: {
    margin: theme.spacing.unit
  },
  input: {
    display: 'none'
  }
})

class FactoryMapper extends Component {
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

  render () {
    const {
      factories,
      classes,
      handleTextInput,
      handleChildrenInput,
      handleLowerBound,
      handleUpperBound,
      validationValues,
      updateFactory
    } = this.props
    return (
      /**
      * React.Fragment added to prevent the FactoryMenu
      * from not being able to know which component it lied in
      */
      (
        <Wrapper>
          {factories.map(item => (
            <React.Fragment key={item._id}>
              <div>
                <ul>
                  <li>
                    <div>
                      - {item.name}
                      {/** BoundNumbers is a styled-component */}
                      <BoundNumbers>
                        {item.lowerBound} : {item.upperBound}
                      </BoundNumbers>
                      <Button
                        aria-owns={this.state.anchor ? 'simple-menu' : null}
                        aria-haspopup='true'
                        onClick={event => {
                          this.handleClick(event)
                          this.currentFactory(item)
                        }}
                        variant='outlined'
                        color='secondary'
                        className={classes.button}
                      >
                        Modify
                      </Button>
                    </div>
                    <ul>
                      {item.children.map((item, index) => (
                        <li key={index}>-- {item}</li>
                      ))}
                    </ul>
                  </li>
                </ul>
              </div>
              <UpdateCurrentFactory
                item={this.state.currentFactory}
                anchor={this.state.anchor}
                removeFactory={this.removeFactory}
                handleClose={this.handleClose}
                /** Handlers passed as props again */
                handleTextInput={handleTextInput}
                handleChildrenInput={handleChildrenInput}
                handleLowerBound={handleLowerBound}
                handleUpperBound={handleUpperBound}
                validationValues={validationValues}
                updateFactory={updateFactory}
              />
            </React.Fragment>
          ))}

        </Wrapper>
      )
    )
  }
}

/** Styled Components */

const Wrapper = styled.div`
  text-align:left;
  ul {
    list-style: none;
    li {
      padding-left: 1rem;
    }
  }
`
const BoundNumbers = styled.span`
  margin: 0 1rem;
  background: #404347;
  border-radius: 1rem;
  padding: .1rem .8rem;
  color: white;
`

export default withStyles(styles)(FactoryMapper)
