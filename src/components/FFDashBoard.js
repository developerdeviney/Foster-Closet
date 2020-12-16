import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { Redirect, Link } from 'react-router-dom'

const FFDashboard = ({ auth }) => {
  const [requestList, setRequestList] = useState([])

  useEffect(() => {
    axios
      .get(`https://foster-closet.herokuapp.com/api/item/${id}`, {
        auth: auth
      })
      .then((response) => {
        setRequestList(response.data)
      })
  }, [auth])

  if (!auth) {
    return <Redirect to='/foster-family-login' />
  }

  return (
    <div className='FFDashboard'>
      <h1>Welcome to your Virtual Foster Closet!</h1>
      <h2>Helping our community</h2>
    </div>
  )
}

export default FFDashboard
