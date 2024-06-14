import React from 'react'
import FormInput from '../components/FormInput'
import SubmitBtn from '../components/SubmitBtn'
import { Link, useNavigate } from 'react-router-dom'
import { useState } from 'react'
import axios from 'axios'
import { ToastContainer, toast } from 'react-toastify';


const Register = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({});
  const [loading, setLoading] = useState(false);

  function handleChange(e){
    setFormData({...formData, [e.target.name]:e.target.value});
  }

  async function handleSubmit(e){
    e.preventDefault();
    try{
      setLoading(true);
      const response = await axios({
        method: 'post',
        url: 'http://localhost:4000/v1/auth/register',
        data: formData
      });
      console.log(response);
      toast.success("Registered successfully");
      navigate('/');
    }
    catch(e){
      toast.error("Something went wrong");
    }
    setLoading(false);
  }

  return (
    <section className='h-screen grid place-items-center'>
        <form onSubmit={handleSubmit} className='w-96 card p-8 bg-base-100 shadow-lg flex flex-col gap-y-4'>
            <h4 className='text-center text-3xl font-bold'>Register</h4>
            
            <label className="form-control w-full max-w-xs">
              <div className="label">
                <span className="label-text">Username</span>
              </div>
              <input type='text' placeholder="Type here" name='username' defaultValue='' className="input input-bordered " onChange={handleChange} />
            </label>

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

            <div className='mt-4'>
                <SubmitBtn disabled={loading} text={loading? "Loading": "Register"}></SubmitBtn>
            </div>
            <p className="text-center">Already have an account? <Link to='/login' className='ml-2 link link-hover link-primary capitalize'>Login</Link></p>

        </form>
    </section>
  )
}

export default Register