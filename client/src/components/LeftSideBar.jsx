import React from 'react'
import HomeLayout from '../pages/HomeLayout'
import { NavLink } from 'react-router-dom'
import Header from './Header'

const LeftSideBar = () => {
    return (
        <div class="flex h-screen bg-gray-100">
            

            <div class="hidden md:flex flex-col w-64">
                <div class="flex items-center justify-center h-16">
                    <NavLink to='/' className='lg:flex btn btn-primary text-xl items-center'>SpeedNet</NavLink>
                </div>

                <div className="navbar-center hidden lg:flex">

                    <ul className='menu bg-base-200 w-60 p-0 [&_li>*]:rounded-none text-lg'>
                    
                        <li className=''><NavLink to='/' className='py-2' >Home</NavLink></li>
                        <li><NavLink to='/about'>About</NavLink></li>
                        <li><NavLink to='/vendor'>Supplier</NavLink></li>
                        <li><NavLink to='/main'>Active Connections</NavLink></li>
                        <li><NavLink to='/inventory'>Inventory</NavLink></li>
                        <li><NavLink to='/dealer'>Dealers</NavLink></li>
                        <li><NavLink to='/customer'>Customers</NavLink></li>
                    </ul>
                </div>


            </div>


            <div class="flex flex-col flex-1 overflow-y-auto">

                <HomeLayout></HomeLayout>
            </div>

        </div>
    )
}

export default LeftSideBar