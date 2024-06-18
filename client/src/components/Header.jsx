import React from 'react'
import { useSelector } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import axios from 'axios'
import { logoutSuccess } from '../redux/userSlice'
import { NavLink } from 'react-router-dom'
const BASE_URL = import.meta.env.VITE_REACT_APP_BASE_URL;


const Header = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const {currentUser} = useSelector((state)=>state.user);

  async function handleLogout() {
    try{
      await axios.get(`${BASE_URL}/v1/auth/logout`);
      dispatch(logoutSuccess());
    }
    catch(err){
      console.log(err)
    }
    
  }
  
  return (
    <header className='bg-neutral py-2 text-neutral-content'>
        <div className="align-elements flex w-full justify-between">
          <div>
          <NavLink to='/' className='lg:flex btn btn-primary text-xl items-center btn-sm'>FSM</NavLink>

          </div>
        <div className="flex gap-x-6 justify-end items-center w-full">
            
            {
              currentUser&&<p>Welcome <Link to='/profile' className='link link-hover text-xs sm:text-sm font-bold'>{currentUser?.username?.toUpperCase()}</Link></p>
            }
            {
              currentUser?<button onClick={handleLogout} className=' btn-primary text-xs sm:text-sm'>Logout</button>:<Link to='/login' className='link link-hover text-xs sm:text-sm'>Login</Link>
            }
        </div>

        </div>
    </header>
  )
}

export default Header