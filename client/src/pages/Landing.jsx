import React from 'react'
import Login from './Login'
import About from './About'
import { Route, Routes } from 'react-router-dom'

const Landing = () => {
  return (
    <div>Landing

        <Routes>
            <Route path='about' element={<About></About>}></Route>
            <Route path='login' element={<Login></Login>}></Route>
        </Routes>
    </div>
  )
}

export default Landing