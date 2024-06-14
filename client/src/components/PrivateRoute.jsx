import React from 'react'
import { useSelector } from 'react-redux'
import { Outlet, Navigate } from 'react-router-dom'

const PrivateRoute = () => {

    const {currentUser} = useSelector((state)=>state.user)
  return (
    currentUser?<Outlet></Outlet>:<Navigate to='/register'></Navigate>
  )
}

export default PrivateRoute