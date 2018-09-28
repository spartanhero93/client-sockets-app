import React, { Component } from 'react'
import Menu from '@material-ui/core/Menu'
import MenuItem from '@material-ui/core/MenuItem'
import Dialog from '@material-ui/core/Dialog'
import DialogActions from '@material-ui/core/DialogActions'
import DialogContent from '@material-ui/core/DialogContent'
import DialogTitle from '@material-ui/core/DialogTitle'
import Button from '@material-ui/core/Button'
import { withStyles } from '@material-ui/core/styles'

import TextFields from '../../TextFields'

const styles = theme => ({
  button: {
    margin: theme.spacing.unit
  },
  input: {
    display: 'none'
  }
})

class UpdateCurrentFactory extends Component {
  state = {
    subMenuOpen: false
  }

  handleNewFactory = hubType => {
    this.props.updateFactory(hubType, this.props.item._id)
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
            <TextFields
              validationValues={validationValues}
              handleTextInput={handleTextInput}
              handleChildrenInput={handleChildrenInput}
              handleLowerBound={handleLowerBound}
              handleUpperBound={handleUpperBound}
            />
          </DialogContent>
          <DialogActions>
            <Button
              variant='outlined'
              color='secondary'
              onClick={this.handleSubMenuClose}
            >
              Cancel
            </Button>
            <Button
              variant='outlined'
              color='secondary'
              onClick={() => {
                this.handleNewFactory('updateHub')
                this.handleSubMenuClose()
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
export default withStyles(styles)(UpdateCurrentFactory)
