import React, { Component } from 'react'
import Button from '@material-ui/core/Button'
import Dialog from '@material-ui/core/Dialog'
import DialogActions from '@material-ui/core/DialogActions'
import DialogContent from '@material-ui/core/DialogContent'
import DialogContentText from '@material-ui/core/DialogContentText'
import DialogTitle from '@material-ui/core/DialogTitle'
import { generateRandomChildren, validateLowerBound } from './helpers'
import socket from '../socket'
import TextFields from './TextFields'
class CreateNewFactory extends Component {
  state = {
    currentText: '',
    numberOfChildren: 0,
    isNumOfChildrenValid: true,
    lowerBound: 0,
    isLowerBoundValid: true,
    upperBound: 10000,
    isUpperBoundValid: true
  }
  handleTextInput = event => {
    this.setState({
      currentText: event.target.value
    })
  }

  handleChildrenInput = event => {
    let currentAmount = Number(event.target.value)
    if (currentAmount > 15 || currentAmount < 0) {
      this.setState({ isNumOfChildrenValid: false })
    } else {
      this.setState({
        numberOfChildren: currentAmount,
        isNumOfChildrenValid: true
      })
    }
  }
  handleLowerBound = event => {
    let currentAmount = Number(event.target.value)
    if (currentAmount < 0) {
      return this.setState({ isLowerBoundValid: false })
    } else if (currentAmount > this.state.upperBound * 1) {
      return this.setState({ isLowerBoundValid: false })
    }
    this.setState({
      lowerBound: currentAmount,
      isLowerBoundValid: true,
      isUpperBoundValid: true
    })
  }
  handleUpperBound = event => {
    const max = 10000
    let currentAmount = Number(event.target.value)
    if (currentAmount > max) {
      return this.setState({ isUpperBoundValid: false })
    } else if (currentAmount < this.state.lowerBound) {
      return this.setState({ isUpperBoundValid: false })
    }
    this.setState({
      upperBound: currentAmount,
      isUpperBoundValid: true,
      isLowerBoundValid: true
    })
  }
  addFactory = () => {
    const {
      lowerBound,
      upperBound,
      numberOfChildren,
      isNumOfChildrenValid,
      isLowerBoundValid,
      isUpperBoundValid
    } = this.state

    if (!isLowerBoundValid || !isUpperBoundValid || !isNumOfChildrenValid) {
      alert('Please check your values')
      this.setState({
        numberOfChildren: 0,
        upperBound: 10000,
        lowerBound: 0,
        children: []
      })
    } else {
      const randomArray = generateRandomChildren(
        numberOfChildren,
        lowerBound,
        upperBound
      )

      socket.emit('addFactory', {
        name: this.state.currentText,
        numberOfChildren,
        upperBound,
        lowerBound,
        children: randomArray
      })

      this.setState({
        numberOfChildren: 0,
        upperBound: 10000,
        lowerBound: 0,
        children: []
      })
      this.props.handleClose()
    }
  }
  render () {
    return (
      <div>
        <Dialog
          open={this.props.dialogOpen}
          onClose={this.props.handleClose} // <=== Probable not needed ===>//
          aria-labelledby='form-dialog-title'
        >
          <DialogTitle id='form-dialog-title'>Create a new Factory</DialogTitle>
          <DialogContent>
            <DialogContentText>
              Enter a name, amount of children, upperBound, and lowerBound
            </DialogContentText>
            <TextFields
              handleTextInput={this.handleTextInput}
              handleChildrenInput={this.handleChildrenInput}
              handleLowerBound={this.handleLowerBound}
              handleUpperBound={this.handleUpperBound}
              currentState={this.state}
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={this.props.handleClose} color='primary'>
              Cancel
            </Button>
            <Button
              onClick={() => {
                this.addFactory()
              }}
              color='primary'
            >
              Submit
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    )
  }
}
export default CreateNewFactory
