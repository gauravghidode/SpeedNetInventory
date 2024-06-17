import React from 'react'
import { useSelector } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import axios from 'axios'
import { logoutSuccess } from '../redux/userSlice'
const BASE_URL = import.meta.env.VITE_REACT_APP_BASE_URL;
import { IoMdArrowRoundBack } from "react-icons/io";

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
            { currentUser && 
              <button className='btn btn-sm flex-col pr-9' onClick={()=>navigate(-1)}><IoMdArrowRoundBack /><>Back</></button>
            }
          </div>
        <div className="flex gap-x-6 justify-end items-center w-full">
            
            {
              currentUser?<p>Welcome <Link to='/profile' className='link link-hover text-xs sm:text-sm font-bold'>{currentUser?.username?.toUpperCase()}</Link></p>:<Link to='/register' className='link link-hover text-xs sm:text-sm'>Register</Link>
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