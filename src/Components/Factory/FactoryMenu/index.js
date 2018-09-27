import React, { Component } from 'react'
import Menu from '@material-ui/core/Menu'
import MenuItem from '@material-ui/core/MenuItem'
import TextField from '@material-ui/core/TextField'
import Dialog from '@material-ui/core/Dialog'
import DialogActions from '@material-ui/core/DialogActions'
import DialogContent from '@material-ui/core/DialogContent'
import DialogContentText from '@material-ui/core/DialogContentText'
import DialogTitle from '@material-ui/core/DialogTitle'
import Button from '@material-ui/core/Button'

// import SubMenu from './SubMenu'

class FactoryMenu extends Component {
  state = {
    subMenuOpen: false,
    newName: '',
    newChildrenAmount: 0
  }

  handleSubMenuOpen = () => {
    this.setState({ subMenuOpen: true })
  }
  handleSubMenuClose = () => {
    this.setState({ subMenuOpen: false })
  }

  render () {
    const {
      item,
      anchor,
      updateFactory,
      handleClose,
      removeFactory
    } = this.props
    return (
      <div>
        <Menu
          id='simple-menu'
          anchorEl={anchor}
          open={Boolean(anchor)}
          onClose={handleClose}
        >
          {console.log('factory menu Component', item)}
          <MenuItem
            onClick={() => {
              removeFactory(item._id)
              handleClose()
            }}
          >
            Remove
          </MenuItem>
          <MenuItem
            onClick={() => {
              this.handleSubMenuOpen()
              handleClose()
            }}
          >
            Update
          </MenuItem>
          {/* <SubMenu
          item={item}
          open={this.state.subMenuOpen}
          handleSubMenuClose={this.handleSubMenuClose}
          updateFactory={updateFactory}
        /> */}
        </Menu>
        <Dialog
          open={this.state.subMenuOpen}
          onClose={this.handleSubMenuClose}
          aria-labelledby='form-dialog-title'
        >
          <DialogTitle id='form-dialog-title'>{`Modify the values of "${item.name}"`}</DialogTitle>
          <DialogContent>
            {/* <DialogContentText>
              Enter a name, amount of children, upperBound, and lowerBound
            </DialogContentText> */}
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
            <Button color='primary' onClick={this.handleSubMenuClose}>
              Submit
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    )
  }
}

export default FactoryMenu
