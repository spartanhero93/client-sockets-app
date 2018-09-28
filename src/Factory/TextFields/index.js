import React, { Component } from 'react'
import TextField from '@material-ui/core/TextField'

class TextFields extends Component {
  state = {}

  render () {
    const {
      currentState,
      handleTextInput,
      handleChildrenInput,
      handleLowerBound,
      handleUpperBound
    } = this.props

    return (
      <React.Fragment>
        <TextField
          autoFocus
          margin='dense'
          id='name'
          label='Name'
          type='text'
          fullWidth
          onChange={handleTextInput}
        />
        <TextField
          error={!currentState.isNumOfChildrenValid}
          id='standard-number'
          label={
            currentState.isNumOfChildrenValid
              ? 'Number of children'
              : 'Children value must be at least 0 and at most 15'
          }
          margin='normal'
          value={currentState.numberOfChildren}
          onChange={handleChildrenInput}
          type='number'
          fullWidth
          InputLabelProps={{
            shrink: true
          }}
          placeholder='0'
        />

        <TextField
          error={!currentState.isLowerBoundValid}
          label={
            currentState.isLowerBoundValid
              ? 'LowerBound'
              : `Value must be positive number, at least 0 and less than ${currentState.upperBound}`
          }
          id='standard-number'
          margin='normal'
          onChange={handleLowerBound}
          type='number'
          fullWidth
          InputLabelProps={{
            shrink: true
          }}
          inputProps={{
            min: 0,
            max: currentState.upperBound,
            step: 1
          }}
          placeholder='0'
        />
        <TextField
          error={!currentState.isUpperBoundValid}
          label={
            currentState.isUpperBoundValid
              ? 'UpperBound'
              : `value must be positive, higher than ${currentState.lowerBound} and less than 10000`
          }
          id='standard-number'
          margin='normal'
          onChange={handleUpperBound}
          type='number'
          fullWidth
          InputLabelProps={{
            shrink: true
          }}
          inputProps={{
            min: currentState.lowerBound,
            max: 10000,
            step: 1
          }}
          placeholder='10000'
        />
      </React.Fragment>
    )
  }
}

export default TextFields
