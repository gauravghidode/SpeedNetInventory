import React from 'react'
import FormInput from '../components/FormInput'
import SubmitBtn from '../components/SubmitBtn'
import { Form, Link, useNavigate } from 'react-router-dom'
import axios from 'axios'
import { useState } from 'react'
import { ToastContainer, toast } from 'react-toastify'
import { loginFailure, loginStart, loginSuccess } from '../redux/userSlice'
import { useDispatch, useSelector } from 'react-redux'
import OAuth from '../components/OAuth'
const BASE_URL = import.meta.env.VITE_REACT_APP_BASE_URL;

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({});
  const {loading, error} = useSelector((state)=>state.user);

  function handleChange(e){
    setFormData({...formData, [e.target.name]:e.target.value});
  }

  async function handleSubmit(e){
    e.preventDefault();
    try{
      dispatch(loginStart());
      const response = await axios({
        method: 'post',
        url: `${BASE_URL}/v1/auth/login`,
        data: formData,
        withCredentials: true
      });
      // console.log(response);
      dispatch(loginSuccess(response));
      toast.success("Logged in successfully");
      navigate('/');
    }
    catch(e){
      
      toast.error("Something went wrong"+e.message);
      dispatch(loginFailure(e));
    }
    
  }

  return (
    <section className='h-screen grid place-items-center'>
        <form onSubmit={handleSubmit} className='card w-96 p-8 bg-base-100 shadow-lg flex flex-col gap-y-4'>
            <h4 className='text-center text-3xl font-bold'>Login</h4>

            <label className="form-control w-full max-w-xs">
              <div className="label">
                <span className="label-text">Email</span>
              </div>
              <input type='email' placeholder="Type here" name='email' defaultValue='' className="input input-bordered " onChange={handleChange} />
            </label>

            <label className="form-control w-full max-w-xs">
              <div className="label">
                <span className="label-text">Password</span>
              </div>
              <input type='password' placeholder="Type here" name='password' defaultValue='' className="input input-bordered " onChange={handleChange} />
            </label>

            <div className="mt-4">
                <SubmitBtn text="Login"></SubmitBtn>
            </div>
            {/* <OAuth></OAuth> */}
            <p className="text-center">Not a member yet? <Link to='/register' className='ml-2 link link-hover link-primary capitalize'>Sign up</Link></p>
        </form>
        
    </section>
  )
}

export default Login