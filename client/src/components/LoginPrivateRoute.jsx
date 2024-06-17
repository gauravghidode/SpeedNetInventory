import React from 'react'
import { useSelector } from 'react-redux'
import { Outlet, Navigate } from 'react-router-dom'

const LoginPrivateRoute = () => {

    const {currentUser} = useSelector((state)=>state.user)
  return (
    currentUser?<Outlet></Outlet>:<Navigate to='/login'></Navigate>
  )
}

export default LoginPrivateRoute