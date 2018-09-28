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
        : 'Children value must be at least 0 and at most 15'
    }
    margin='normal'
    value={this.state.numberOfChildren}
    onChange={this.handleChildrenInput}
    type='number'
    fullWidth
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
        : `Value must be positive number, at least 0 and less than ${this.state.upperBound}`
    }
    id='standard-number'
    margin='normal'
    onChange={this.handleLowerBound}
    type='number'
    fullWidth
    InputLabelProps={{
      shrink: true
    }}
    inputProps={{
      min: 0,
      max: this.state.upperBound,
      step: 1
    }}
    placeholder='0'
  />
  <TextField
    error={!this.state.isUpperBoundValid}
    label={
      this.state.isUpperBoundValid
        ? 'UpperBound'
        : `value must be positive, higher than ${this.state.lowerBound} and less than 10000`
    }
    id='standard-number'
    margin='normal'
    onChange={this.handleUpperBound}
    type='number'
    fullWidth
    InputLabelProps={{
      shrink: true
    }}
    inputProps={{
      min: this.state.lowerBound,
      max: 10000,
      step: 1
    }}
    placeholder='10000'
  />