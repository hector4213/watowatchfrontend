import React, { useState, useEffect } from 'react'
import listService from '../apis/listService'

import { Button } from '@material-ui/core'

const Logout = ({ history }) => {
  const handleLogOut = () => {
    window.localStorage.clear()
    history.push('/')
  }

  return <Button onClick={handleLogOut}> LOGOUT</Button>
}

export default Logout
