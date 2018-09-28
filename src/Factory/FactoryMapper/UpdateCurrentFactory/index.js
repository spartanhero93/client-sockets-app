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

import TextFields from '../../TextFields'

class UpdateCurrentFactory extends Component {
  state = {
    subMenuOpen: false,
    currentFactory: {}
  }

  componentWillReceiveProps (props) {
    const incomingFactory = Object.assign(this.state.currentFactory, props.item)
    this.setState({ currentFactory: incomingFactory })
  }

  handleNewFactory = hubType => {
    this.props.updateFactory(hubType, this.state.currentFactory._id)
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
      removeFactory,
      handleTextInput,
      handleClose,
      handleChildrenInput,
      handleLowerBound,
      handleUpperBound,
      validationValues
    } = this.props
    return (
      <div>
        <Menu
          id='simple-menu'
          anchorEl={anchor}
          open={Boolean(anchor)}
          onClose={handleClose}
        >
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
            <TextFields
              validationValues={validationValues}
              handleTextInput={handleTextInput}
              handleChildrenInput={handleChildrenInput}
              handleLowerBound={handleLowerBound}
              handleUpperBound={handleUpperBound}
              item={item}
            />
          </DialogContent>
          <DialogActions>
            <Button color='primary'>
              Cancel
            </Button>
            <Button
              color='primary'
              onClick={() => {
                this.handleSubMenuClose()
                this.handleNewFactory('updateHub')
              }}
            >
              Submit
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    )
  }
}
export default UpdateCurrentFactory
