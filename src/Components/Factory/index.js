import React from 'react'
import Generator from './Generator'
import CreateNewFactory from './CreateNewFactory'

const Root = props => {
  const { dialogOpen, handleClose, factories } = props
  return (
    <div>
      <CreateNewFactory dialogOpen={dialogOpen} handleClose={handleClose} />
      <Generator factories={factories} />
    </div>
  )
}
export default Root
