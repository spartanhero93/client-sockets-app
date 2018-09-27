import React from 'react'
import Menu from '@material-ui/core/Menu'
import MenuItem from '@material-ui/core/MenuItem'

const FactoryMenu = props => {
  const { item, anchor, updateFactory, handleClose, removeFactory } = props

  return (
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
          handleClose()
          updateFactory(item)
        }}
      >
        Update
      </MenuItem>
    </Menu>
  )
}

export default FactoryMenu
