import React, { Component } from 'react'
import Button from '@material-ui/core/Button'
import Dialog from '@material-ui/core/Dialog'
import DialogActions from '@material-ui/core/DialogActions'
import DialogContent from '@material-ui/core/DialogContent'
import DialogTitle from '@material-ui/core/DialogTitle'

import { generateRandomChildren } from './helpers'
import socket from '../socket'
import FactoryMapper from './FactoryMapper'
import TextFields from './TextFields'
import styled from 'styled-components'

class Root extends Component {
  state = {
    currentText: '',
    isNameValidated: true,
    numberOfChildren: 0,
    isNumOfChildrenValid: true,
    lowerBound: 0,
    isLowerBoundValid: true,
    upperBound: 10000,
    isUpperBoundValid: true
  }

  /** Using conditional statements to check incoming text values */
  handleTextInput = event => {
    event.target.value.length > 20
      ? this.setState({
        isNameValidated: false,
        currentText: event.target.value.trim()
      })
      : this.setState({
        currentText: event.target.value.trim(),
        isNameValidated: true
      })
  }

  handleChildrenInput = event => {
    let currentAmount = event.target.value.replace(/^0+/, '')
    if (currentAmount > 15 || currentAmount < 0) {
      this.setState({
        isNumOfChildrenValid: false,
        numberOfChildren: currentAmount
      })
    } else {
      this.setState({
        numberOfChildren: currentAmount,
        isNumOfChildrenValid: true
      })
    }
  }
  handleLowerBound = event => {
    let currentAmount = event.target.value.replace(/^0+/, '')
    if (currentAmount < 0 || currentAmount > this.state.upperBound * 1) {
      return this.setState({
        isLowerBoundValid: false,
        lowerBound: currentAmount
      })
    } else {
      this.setState({
        lowerBound: currentAmount,
        isLowerBoundValid: true,
        isUpperBoundValid: true
      })
    }
  }
  handleUpperBound = event => {
    let currentAmount = event.target.value.replace(/^0+/, '')
    if (
      currentAmount > 10000 ||
      currentAmount < 0 ||
      currentAmount < this.state.lowerBound * 1
    ) {
      return this.setState({
        isUpperBoundValid: false,
        upperBound: currentAmount
      })
    } else {
      this.setState({
        upperBound: currentAmount,
        isUpperBoundValid: true,
        isLowerBoundValid: true
      })
    }
  }
  addFactory = (hubType, _id) => {
    const {
      currentText,
      lowerBound,
      upperBound,
      numberOfChildren,
      isNumOfChildrenValid,
      isLowerBoundValid,
      isUpperBoundValid,
      isNameValidated
    } = this.state
    /** Validating state */
    if (
      currentText.length <= 0 ||
      !isNumOfChildrenValid ||
      numberOfChildren === '' ||
      currentText.length > 20 ||
      upperBound === '' ||
      lowerBound === '' ||
      !isLowerBoundValid ||
      !isUpperBoundValid ||
      !isNameValidated
    ) {
      alert('Please check your values')
      this.setState({
        numberOfChildren: 0,
        upperBound: 10000,
        lowerBound: 0
      })
    } else {
      const newChildren = generateRandomChildren(
        numberOfChildren,
        lowerBound,
        upperBound
      )

      if (hubType === 'addMain') {
        socket.emit('addFactory', {
          name: this.state.currentText,
          numberOfChildren,
          upperBound,
          lowerBound,
          children: newChildren
        })
      } else if (hubType === 'updateHub') {
        socket.emit('updateFactory', {
          name: this.state.currentText,
          numberOfChildren,
          upperBound,
          lowerBound,
          children: newChildren,
          _id
        })
      }
      this.setState({
        numberOfChildren: 0,
        upperBound: 10000,
        lowerBound: 0
      })
      this.props.handleClose()
    }
  }
  render () {
    return (
      <div>
        <Container>
          <FactoryMapper
            factories={this.props.factories}
            handleTextInput={this.handleTextInput}
            handleChildrenInput={this.handleChildrenInput}
            handleLowerBound={this.handleLowerBound}
            handleUpperBound={this.handleUpperBound}
            validationValues={this.state}
            updateFactory={this.addFactory}
          />
        </Container>
        <Dialog
          open={this.props.dialogOpen}
          onClose={this.props.handleClose}
          aria-labelledby='form-dialog-title'
        >
          <DialogTitle id='form-dialog-title'>Create a new Factory</DialogTitle>
          <DialogContent>
            <TextFields
              handleTextInput={this.handleTextInput}
              handleChildrenInput={this.handleChildrenInput}
              handleLowerBound={this.handleLowerBound}
              handleUpperBound={this.handleUpperBound}
              validationValues={this.state}
            />
          </DialogContent>
          <DialogActions>
            <Button
              onClick={this.props.handleClose}
              variant='outlined'
              color='secondary'
            >
              Cancel
            </Button>
            <Button
              onClick={() => {
                this.addFactory('addMain')
              }}
              variant='outlined'
              color='secondary'
            >
              Submit
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    )
  }
}

const Container = styled.div`
  border-left: 2px dashed;
`

export default Root
