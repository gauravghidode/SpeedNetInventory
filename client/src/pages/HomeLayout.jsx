import React from 'react'
import { Route, Routes } from 'react-router-dom'
import About from './About'
import Header from '../components/Header'
import Navbar from '../components/Navbar'
import Vendor from './Vendor'
import Main from './Main'
import Inventory from './Inventory'
import Profile from './Profile'
import PrivateRoute from '../components/PrivateRoute'
import Account from './Account'
import Dealers from './Dealers'
import Customers from './Customers'
import LeftSideBar from '../components/LeftSideBar'
import VendorPage from './VendorPage'
import Admin from './Admin'
const BASE_URL = import.meta.env.VITE_REACT_APP_BASE_URL;

const HomeLayout = () => {
  return (
    <>
        
        <Navbar></Navbar>
        
        <section className='align-elements py-5'>
            <Routes>
                <Route path='about' element={<About></About>}></Route>
                <Route path='vendor' element={<VendorPage></VendorPage>}></Route>
                <Route path='dealer' element={<Dealers></Dealers>}></Route>
                <Route path='customer' element={<Customers></Customers>}></Route>
                <Route path='main' element={<Main></Main>}></Route>
                <Route path='inventory' element={<Inventory></Inventory>}></Route>
                <Route element={<PrivateRoute></PrivateRoute>}>
                    <Route path='profile/:id' element={<Profile></Profile>}></Route>
                </Route>
                <Route path='accounts/:accno' element={<Account></Account>}></Route>
                <Route path='vendor/:id' element={<Vendor></Vendor>}></Route>
                <Route path='admin' element={<Admin></Admin>}></Route>
                
            </Routes>
        </section>
    </>
  )
}

export default HomeLayout