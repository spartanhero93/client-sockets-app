import React from 'react'
import TextField from '@material-ui/core/TextField'

const TextFields = props => {
  const {
    validationValues,
    handleTextInput,
    handleChildrenInput,
    handleLowerBound,
    handleUpperBound
  } = props

  return (
    <React.Fragment>
      <TextField
        autoFocus
        error={!validationValues.isNameValidated}
        margin='dense'
        id='name'
        label={
          validationValues.isNameValidated
            ? 'Name'
            : 'Name must be 1 character and less than 21'
        }
        type='text'
        fullWidth
        onChange={handleTextInput}
        inputProps={{
          max: 20
        }}
      />
      <TextField
        autoFocus
        error={!validationValues.isNumOfChildrenValid}
        id='standard-number'
        label={
          validationValues.isNumOfChildrenValid
            ? 'Number of children'
            : 'Children must be at least 0 and at most 15'
        }
        margin='normal'
        value={validationValues.numberOfChildren}
        onChange={handleChildrenInput}
        type='number'
        fullWidth
        InputLabelProps={{
          shrink: true
        }}
      />

      <TextField
        error={!validationValues.isLowerBoundValid}
        label={
          validationValues.isLowerBoundValid
            ? 'LowerBound'
            : `Value must be at least 0 and less than ${validationValues.upperBound}`
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
            : `value must be higher than ${validationValues.lowerBound} and less than 10000`
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

export default TextFields
