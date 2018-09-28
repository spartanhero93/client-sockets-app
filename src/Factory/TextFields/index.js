import React, { Component } from 'react'
import TextField from '@material-ui/core/TextField'

class TextFields extends Component {
  state = {}

  render () {
    const {
      item,
      validationValues,
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
          autoFocus
          error={!validationValues.isNumOfChildrenValid}
          id='standard-number'
          label={
            validationValues.isNumOfChildrenValid
              ? 'Number of children'
              : 'Children value must be at least 0 and at most 15'
          }
          margin='normal'
          value={validationValues.numberOfChildren}
          onChange={handleChildrenInput}
          type='number'
          fullWidth
          InputLabelProps={{
            shrink: true
          }}
          placeholder='0'
        />

        <TextField
          error={!validationValues.isLowerBoundValid}
          label={
            validationValues.isLowerBoundValid
              ? 'LowerBound'
              : `Value must be positive number, at least 0 and less than ${validationValues.upperBound}`
          }
          id='standard-number'
          margin='normal'
          value={validationValues.lowerBound}
          onChange={handleLowerBound}
          type='number'
          fullWidth
          InputLabelProps={{
            shrink: true
          }}
          inputProps={{
            min: 0,
            max: validationValues.upperBound,
            step: 1
          }}
          placeholder='0'
        />
        <TextField
          error={!validationValues.isUpperBoundValid}
          label={
            validationValues.isUpperBoundValid
              ? 'UpperBound'
              : `value must be positive, higher than ${validationValues.lowerBound} and less than 10000`
          }
          id='standard-number'
          margin='normal'
          value={validationValues.upperBound}
          onChange={handleUpperBound}
          type='number'
          fullWidth
          InputLabelProps={{
            shrink: true
          }}
          inputProps={{
            min: validationValues.lowerBound,
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
