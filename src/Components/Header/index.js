import React from 'react'
import { withStyles } from '@material-ui/core/styles'
import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import Typography from '@material-ui/core/Typography'
import Button from '@material-ui/core/Button'

const styles = theme => ({
  root: {
    flexGrow: 1
  },
  grow: {
    flexGrow: 0
  },
  menuButton: {
    marginLeft: 30,
    marginRight: 20,
    color: 'white'
  }
})

function Header (props) {
  const { classes } = props
  return (
    <div className={classes.root}>
      <AppBar position='sticky'>
        <Toolbar>
          <Typography variant='title' color='inherit' className={classes.grow}>
            Root
          </Typography>
          <Button
            variant='contained'
            color='secondary'
            className={classes.menuButton}
            onClick={props.handleClickOpen}
          >
            New Factory
          </Button>

        </Toolbar>
      </AppBar>
    </div>
  )
}

export default withStyles(styles)(Header)
