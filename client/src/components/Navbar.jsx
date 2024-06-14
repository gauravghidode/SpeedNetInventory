import React, { useEffect } from 'react'
import { BsMoonFill, BsSunFill } from "react-icons/bs";
import {FaBarsStaggered} from 'react-icons/fa6'
import { NavLink } from 'react-router-dom';
import { useState } from 'react';



const getThemeFromLocalStorage = ()=>{
    return localStorage.getItem('theme') || 'winter'
}


const Navbar = () => {
    const [theme, setTheme] = useState(getThemeFromLocalStorage());

    function handleTheme(){
        const newTheme = theme==='winter'?'dark':'winter';
        
        document.documentElement.setAttribute('data-theme', newTheme);
        setTheme(newTheme);
    }

    useEffect(()=>{
        document.documentElement.setAttribute('data-theme', theme);
        localStorage.setItem('theme', theme);
    }, [theme]);

  return (
    <nav className='bg-base-200'>
        <div className="navbar align-elements">
            <div className="navbar-start">
                <div className="dropdown">
                    <label tabIndex={0} className='btn btn-ghost lg:hidden'>
                        <FaBarsStaggered className='h-6 w-6'></FaBarsStaggered>
                    </label>
                    <ul tabIndex={0} className='menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-200'>
                        <li><NavLink to='/'>Home</NavLink></li>
                        <li><NavLink to='/about'>About</NavLink></li>
                        <li><NavLink to='/vendor'>Vendor</NavLink></li>
                        <li><NavLink to='/main'>My Accounts</NavLink></li>
                        <li><NavLink to='/inventory'>Inventory</NavLink></li>
                        <li><NavLink to='/dealer'>Dealers</NavLink></li>
                        <li><NavLink to='/customer'>Customers</NavLink></li>
                    </ul>
                </div> 
                <NavLink to='/' className='lg:flex btn btn-primary text-3xl items-center'>SpeedNet</NavLink>

            </div>
            <div className="navbar-center hidden lg:flex">
                <ul className='menu menu-horizontal'>
                    <li><NavLink to='/'>Home</NavLink></li>
                    <li><NavLink to='/about'>About</NavLink></li>
                    <li><NavLink to='/vendor'>Supplier</NavLink></li>
                    <li><NavLink to='/main'>Active Connections</NavLink></li>
                    <li><NavLink to='/inventory'>Inventory</NavLink></li>
                    <li><NavLink to='/dealer'>Dealers</NavLink></li>
                    <li><NavLink to='/customer'>Customers</NavLink></li>
                </ul>
            </div>
            <div className="navbar-end">
                <label className='swap swap-rotate'>
                    <input type="checkbox" name="" id="" onChange={handleTheme}/>
                    <BsSunFill className='swap-on h-4 w-4'></BsSunFill>
                    <BsMoonFill className='swap-off h-4 w-4'></BsMoonFill>
                </label>
            </div>
        </div>
    </nav>
  )
}

export default Navbar