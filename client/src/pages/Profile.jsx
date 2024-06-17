import React, { useEffect } from 'react'
import { useSelector } from 'react-redux'
import moment from 'moment';
import SubmitBtn from '../components/SubmitBtn';
import { updateUserFailure, updateUserSuccess, updateUserStart } from '../redux/userSlice';
import { useDispatch } from 'react-redux';
import { useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import axios from 'axios';
const BASE_URL = import.meta.env.VITE_REACT_APP_BASE_URL;
import { useParams } from 'react-router-dom';


const Profile = () => {
    // const { currentUser, loading } = useSelector((state) => state.user);
    const { id } = useParams();
    const [loading, setLoading] = useState(true);
    const [currentUser, setCurrentUser] = useState();
    const dispatch = useDispatch();

    const [formData, setFormData] = useState();

    function handleChange(e) {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    }
    console.log(formData);

    async function getUserById() {
        try {
            setLoading(true);
            const response = await axios({
                method: 'get',
                // url: `http://localhost:4000/v1/user/update/66649ca26f5308e86e4a375c`,
                url: `${BASE_URL}/v1/user/getUserById/${id}`,
                withCredentials: true
            });
            setCurrentUser(response.data);
            if (response.data.success) {
                setFormData({ customerEditAndSwap: response.data.customerEditAndSwap, customerSwap: response.data.customerSwap, vendorfileAdd: response.data.vendorfileAdd, inventorySwap: response.data.inventorySwap }); return
            }

        }
        catch (e) {
            toast.warning("Something went wrong " + e.message)
            console.log(e);
        }
        setLoading(false);

    }

    async function handleSubmit(e) {
        setFormData({ customerEditAndSwap: formData.customerEditAndSwap, customerSwap: formData.customerSwap, vendorfileAdd: formData.vendorfileAdd, inventorySwap: formData.inventorySwap });

        e.preventDefault();
        try {
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
            if (response.data.success)
                toast.success(response.data.message);
            else
                toast.warning(response.data.message);
        }
        catch (e) {
            toast.error("Something went wrong" + e.message);
        }

    }

    useEffect(() => {
        getUserById();
    }, [])

    return (
        <div>
            {
                loading ? <h1>Loading...</h1> :
                    <>
                        <h1 className='text-3xl font-semibold text-center mb-4'>Profile</h1>
                        <form onSubmit={handleSubmit} action="" className='mx-auto max-w-xs'>
                            <p>Joined {moment(currentUser?.createdAt).fromNow()}</p>
                            <label className="form-control w-full max-w-xs">
                                <div className="label">
                                    <span className="label-text">Username</span>
                                </div>
                                <input type='text' placeholder="Type here" name='username' defaultValue={currentUser?.username} className="input input-bordered " onChange={handleChange} />
                            </label>

                            <label className="form-control w-full max-w-xs">
                                <div className="label">
                                    <span className="label-text">Email</span>
                                </div>
                                <input type='email' placeholder="Type here" name='email' defaultValue={currentUser?.email} className="input input-bordered " onChange={handleChange} />
                            </label>

                            <label className="form-control w-full max-w-xs">
                                <div className="label">
                                    <span className="label-text">Change Password</span>
                                </div>
                                <input type='password' placeholder="New password" name='password' className="input input-bordered " onChange={handleChange} />
                            </label>

                            <label className="form-control w-full max-w-xs">
                                <div className="label">
                                    <span className="label-text">Contact</span>
                                </div>
                                <input type='text' placeholder="Type here" name='contact' defaultValue={currentUser?.contact} className="input input-bordered " onChange={handleChange} />
                            </label>

                            <label className="form-control w-full max-w-xs">
                                <div className="label">
                                    <span className="label-text">Role</span>
                                </div>
                                <select name='role' onChange={handleChange} className="select select-primary w-full max-w-xs select-sm " defaultValue={currentUser?.role}>
                                    <option value='admin'>Admin</option>
                                    <option value='officeStaff'>Office Staff</option>
                                    <option value='technician'>Technician</option>

                                </select>
                            </label>





                            <label className="form-control w-full max-w-xs">
                                <div className="label">
                                    <span className="label-text">Customer: Edit and Swap</span>
                                </div>
                                <select name='customerEditAndSwap' onChange={handleChange} className="select select-primary w-full max-w-xs select-sm " defaultValue={currentUser?.customerEditAndSwap}>
                                    <option value={true}>Allowed</option>
                                    <option value={false}>Protected</option>

                                </select>
                            </label>
                            <label className="form-control w-full max-w-xs">
                                <div className="label">
                                    <span className="label-text">Customer: Swap only</span>
                                </div>
                                <select name='customerSwap' onChange={handleChange} className="select select-primary w-full max-w-xs select-sm " defaultValue={currentUser?.customerSwap}>
                                    <option value={true}>Allowed</option>
                                    <option value={false}>Protected</option>

                                </select>
                            </label>
                            <label className="form-control w-full max-w-xs">
                                <div className="label">
                                    <span className="label-text">Vendor: Add Phone No.</span>
                                </div>
                                <select name='vendorfileAdd' onChange={handleChange} className="select select-primary w-full max-w-xs select-sm " defaultValue={currentUser?.vendorfileAdd}>
                                    <option value={true}>Allowed</option>
                                    <option value={false}>Protected</option>

                                </select>
                            </label>
                            <label className="form-control w-full max-w-xs">
                                <div className="label">
                                    <span className="label-text">Inventory: Swap</span>
                                </div>
                                <select name='inventorySwap' onChange={handleChange} className="select select-primary w-full max-w-xs select-sm " defaultValue={currentUser?.inventorySwap}>
                                    <option value='true'>Allowed</option>
                                    <option value='false'>Protected</option>

                                </select>
                            </label>




                            <div className="mt-4">
                                <SubmitBtn className='mt-4' text={loading ? 'Updating' : 'Update'} disabled={loading}></SubmitBtn>
                            </div>


                        </form>
                    </>
            }
        </div>
    )
}

export default Profile