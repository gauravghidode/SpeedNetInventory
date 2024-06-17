import React from 'react'
import { BrowserRouter as Router, Routes, Route} from 'react-router-dom'
import Landing from './pages/Landing'
import About from './pages/About'
import Login from './pages/Login'
import Error from './pages/Error'
import Register from './pages/Register'
import HomeLayout from './pages/HomeLayout'
import LeftSideBar from './components/LeftSideBar'
import Header from './components/Header'
import LoginPrivateRoute from './components/LoginPrivateRoute'


const App = () => {
  return (
    <Router>
      <Header></Header>
      <Routes>
        {/* <Route path='/*' element={<LeftSideBar></LeftSideBar>} errorElement={<Error></Error>}> */}
        <Route element={<LoginPrivateRoute></LoginPrivateRoute>}>
          <Route path='/*' element={<HomeLayout></HomeLayout>} errorElement={<Error></Error>}>
        </Route>
          
        </Route>
        <Route path='/register' element={<Register></Register>}></Route>
        <Route path='/login' element={<Login></Login>}></Route>
        <Route path='*' element={<Error></Error>}></Route>
      </Routes>
    </Router>
  )
}

export default App