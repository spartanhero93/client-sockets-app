import React, { Component } from 'react'
import Button from '@material-ui/core/Button'
import TextField from '@material-ui/core/TextField'
import Dialog from '@material-ui/core/Dialog'
import DialogActions from '@material-ui/core/DialogActions'
import DialogContent from '@material-ui/core/DialogContent'
import DialogContentText from '@material-ui/core/DialogContentText'
import DialogTitle from '@material-ui/core/DialogTitle'
import { generateRandomChildren, validateLowerBound } from './helpers'
import socket from '../../socket'

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
    let currentAmount = event.target.value
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
    const result = validateLowerBound(event.target.value, this.state.upperBound)

    result
      ? this.setState({
        lowerBound: event.target.value,
        isLowerBoundValid: result
      })
      : this.setState({ isLowerBoundValid: result })
    //   if (event.target.value < 0 || event.target.value > this.state.upperBound) {
    //     return this.setState({ isLowerBoundValid: false })
    //   }
    //   this.setState({ lowerBound: event.target.value, isLowerBoundValid: true })
  }

  handleUpperBound = event => {
    if (
      event.target.value > 10000 ||
      event.target.value <= this.state.lowerBound
    ) {
      return this.setState({ isUpperBoundValid: false })
    }
    this.setState({ upperBound: event.target.value, isUpperBoundValid: true })
  }

  addFactory = () => {
    const { lowerBound, upperBound, numberOfChildren } = this.state

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
            <TextField
              autoFocus
              margin='dense'
              id='name'
              label='Name'
              type='text'
              fullWidth
              onChange={this.handleTextInput}
            />
            <TextField
              error={!this.state.isNumOfChildrenValid}
              id='standard-number'
              label={
                this.state.isNumOfChildrenValid
                  ? 'Number of children'
                  : 'Error number of children must be at least 0 and at most 15'
              }
              margin='normal'
              value={this.state.numberOfChildren}
              onChange={this.handleChildrenInput}
              type='number'
              InputLabelProps={{
                shrink: true
              }}
              placeholder='0'
            />

            <TextField
              error={!this.state.isLowerBoundValid}
              label={
                this.state.isLowerBoundValid
                  ? 'LowerBound'
                  : 'Value must be at least 0'
              }
              id='standard-number'
              margin='normal'
              value={this.state.lowerBound}
              onChange={this.handleLowerBound}
              type='number'
              fullWidth
              InputLabelProps={{
                shrink: true
              }}
              placeholder='0'
            />
            <TextField
              error={!this.state.isUpperBoundValid}
              label={
                this.state.isUpperBoundValid
                  ? 'UpperBound'
                  : 'value must be greater than lowerBound and less than 10000'
              }
              id='standard-number'
              margin='normal'
              value={this.state.upperBound}
              onChange={this.handleUpperBound}
              type='number'
              InputLabelProps={{
                shrink: true
              }}
              placeholder='0'
            />

          </DialogContent>
          <DialogActions>
            <Button onClick={this.props.handleClose} color='primary'>
              Cancel
            </Button>
            <Button
              onClick={() => {
                this.addFactory()
                this.props.handleClose()
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
