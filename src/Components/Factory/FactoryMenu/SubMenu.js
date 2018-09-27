import React from 'react'

const SubMenu = props => {
  const { item, open, handleSubMenuClose, updateFactory } = props

  return (
    <div>
      <Dialog
        open={open}
        onClose={handleSubMenuClose}
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
            // onChange={this.handleTextInput}
          />
        </DialogContent>
        <DialogActions>
          <Button color='primary'>
            Cancel
          </Button>
          <Button color='primary' onClick={handleSubMenuClose}>
            Submit
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  )
}
export default SubMenu
