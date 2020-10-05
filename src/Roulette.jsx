import React, { useState, useEffect } from 'react'

const Roulette = ({ getUserLists, user }) => {
  const [userLists, setUserLists] = useState([])
  const [loaded, setLoaded] = useState(false)

  useEffect(() => {
    const fetchData = async () => {
      if (user === null) {
        return
      }
      const response = await getUserLists(user.id)
      console.log(response)
      setUserLists(response)
      setLoaded(true)
    }
    fetchData()
  }, [user])
  if (user === null) {
    return 'loading....'
  }

  console.log(user.id)
  console.log(userLists)

  return <div>hello</div>
}

export default Roulette
