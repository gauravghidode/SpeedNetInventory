import React from 'react'
import { useSelector } from 'react-redux'
import moment from 'moment';
import SubmitBtn from '../components/SubmitBtn';
import { updateUserFailure, updateUserSuccess, updateUserStart } from '../redux/userSlice';
import { useDispatch } from 'react-redux';
import { useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import axios from 'axios';
const BASE_URL = import.meta.env.VITE_REACT_APP_BASE_URL;


const Profile = () => {
    const { currentUser, loading } = useSelector((state) => state.user);
    const dispatch = useDispatch();
    const updatedTime = new Date(currentUser.updatedAt);

    const formatter = new Intl.DateTimeFormat('en-US', { hour: '2-digit', minute: '2-digit', second: '2-digit' });
    const formattedTime = formatter.format(updatedTime);
    const [formData, setFormData] = useState({});

    function handleChange(e) {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    }
    // console.log(formData);


    async function handleSubmit(e){
        e.preventDefault();
        try{
            console.log(currentUser._id);
          dispatch(updateUserStart());
          const response = await axios({
            method: 'post',
            // url: `http://localhost:4000/v1/user/update/66649ca26f5308e86e4a375c`,
            url: `${BASE_URL}/v1/user/update/${currentUser._id}`,
            data: formData,
            withCredentials: true
          });
          console.log(response);
          dispatch(updateUserSuccess(response));
          toast.success("Profile updated successfully");
        }
        catch(e){
            dispatch(updateUserFailure(e));
          toast.error("Something went wrong"+e.message);
        }
        
      }

    return (
        <div>
            <h1 className='text-3xl font-semibold text-center mb-4'>Profile</h1>
            <form onSubmit={handleSubmit} action="" className='mx-auto max-w-xs'>
                <p>Joined {moment(currentUser.createdAt).fromNow()}</p>
                <label className="form-control w-full max-w-xs">
                    <div className="label">
                        <span className="label-text">Username</span>
                    </div>
                    <input type='text' placeholder="Type here" name='username' defaultValue={currentUser.username} className="input input-bordered " onChange={handleChange} />
                </label>

                <label className="form-control w-full max-w-xs">
                    <div className="label">
                        <span className="label-text">Email</span>
                    </div>
                    <input type='email' placeholder="Type here" name='email' defaultValue={currentUser.email} className="input input-bordered " onChange={handleChange} />
                </label>

                <label className="form-control w-full max-w-xs">
                    <div className="label">
                        <span className="label-text">Change Password</span>
                    </div>
                    <input type='password' placeholder="New password" name='password' className="input input-bordered " onChange={handleChange} />
                </label>
                <div className="mt-4">
                    <SubmitBtn className='mt-4' text={loading?'Updating': 'Update'} disabled={loading}></SubmitBtn>
                </div>


                <p>Last updated on {updatedTime.toDateString()} at {formattedTime}</p>
            </form>
        </div>
    )
}

export default Profile