import React from 'react'
import { useHistory } from 'react-router-dom'
import { Button } from '@material-ui/core'

const Logout = ({ setUser }) => {
  let history = useHistory()
  const handleLogOut = () => {
    window.localStorage.clear()
    setUser(null)
    history.push('/')
  }

  return <Button onClick={handleLogOut}> LOGOUT</Button>
}

export default Logout
