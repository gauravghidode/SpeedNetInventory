import React, { useEffect } from 'react'
import { useSelector } from 'react-redux'
import moment from 'moment';
import SubmitBtn from '../components/SubmitBtn';
import { useDispatch } from 'react-redux';
import { useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { FaUserPen } from "react-icons/fa6";

const BASE_URL = import.meta.env.VITE_REACT_APP_BASE_URL;


const Account = () => {
    const { accno } = useParams();
    console.log(accno);
    const [currentAccount, setCurrentAccount] = useState(undefined);
    const [connections, setConnections] = useState([]);
    const [loading, setLoading] = useState();
    const dispatch = useDispatch();
    const [updatedTime, setUpdatedTime] = useState();
    const { currentUser } = useSelector((state) => state.user);
    const [edit, setEdit] = useState(false);

    // const formatter = new Intl.DateTimeFormat('en-US', { hour: '2-digit', minute: '2-digit', second: '2-digit' });
    // const formattedTime = formatter.format(updatedTime);
    const [formData, setFormData] = useState({});

    function handleChange(e) {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    }
    // console.log(formData);


    async function fetchAccount() {
        try {
            const response = await axios({
                method: 'get',
                url: `${BASE_URL}/v1/account/getAccountById/${accno}`,
                data: formData,
            });
            console.log(response);
            setCurrentAccount(response.data.account);
            setConnections(response.data.connections);
            setUpdatedTime(new Date(currentAccount?.updatedAt))
            toast.success("Customer account fetched successfully");
        }
        catch (e) {

            toast.error("Something went wrong " + e.message);
        }
    }


    async function handleSubmit(e) {
        e.preventDefault();
        try {
            console.log(formData);
            const id = accno;
            const response = await axios({
                method: 'put',
                url: `${BASE_URL}/v1/account/update/${id}`,
                data: formData,
                withCredentials: true
            });
            console.log(response);

            toast.success("Customer Account updated successfully");
        }
        catch (e) {

            toast.error("Something went wrong " + e.message);
        }

    }

    async function handleDeactivate(e) {
        try {
            const index = e.target.value;
            const id = connections[index]._id;
            const userId = currentUser._id
            const accId = accno;
            const iccId = connections[index].ICCID;
            const response = await axios({
                method: 'put',
                url: `${BASE_URL}/v1/phoneNo/deactivateConnection/${id}`,
                data: { userId, iccId, accId },
                withCredentials: true
            });
            toast.success(response.data.message);
        }
        catch (e) {

            toast.error("Something went wrong " + e.message);
        }
    }


    useEffect(() => {
        fetchAccount();
    },[])

    return (
        <div>

            {
                loading ? <p>Loading...</p> :

                    <div>
                        <div className='flex justify-between'>
                            <h1 className='text-2xl font-semibold text-center mb-4'>{currentAccount?.customerFName}</h1>
                            <h1 className='text-2xl font-semibold text-center mb-4'>Account No {currentAccount?.accountNo}</h1>
                            <label htmlFor="my_modal_6" className="btn"><FaUserPen className='h-10 w-10' /></label>

                        </div>

                        <div className='mb-10'>
                            {/* <h3 className=' text-center font-semibold size-xl'>Connections</h3> */}
                            <div className="overflow-x-auto">
                                <table className="table">
                                    {/* head */}
                                    <thead>
                                        <tr>
                                            <th>ICCID</th>
                                            <th>Phone No</th>
                                            <th>Vendor Name</th>
                                            <th>Invoice day</th>
                                            <th>Activation date</th>
                                            <th>Price</th>
                                            <th></th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {
                                            connections?.map((Tuple, index) => (
                                                <tr key={Tuple._id}>
                                                    <td>{Tuple?.ICCID}</td>
                                                    <td>{Tuple?.phoneNo}</td>
                                                    <td>{Tuple?.vendor.vendorName}</td>
                                                    <td>{Tuple?.invoiceDay}</td>
                                                    <td>{Tuple?.date}</td>
                                                    <td>{Tuple?.price}</td>
                                                    {/* <td><button>Update</button></td> */}
                                                    <td><button type='button' value={index} onClick={(e) => handleDeactivate(e)}>Deactivate</button></td>


                                                    {/* <td><button value={index} onClick={updateRow}>Update</button></td> */}
                                                </tr>
                                            ))
                                        }
                                    </tbody>

                                </table>
                            </div>
                        </div>
                        {/* Open the modal using document.getElementById('ID').showModal() method */}

                        <input type="checkbox" id="my_modal_6" className="modal-toggle" />
                        <div className="modal" role="dialog">
                            <div className="modal-box w-9/12 max-w-5xl p-10">
                                <div className="modal-action">
                                    <label htmlFor="my_modal_6" className="btn btn-secondary">Close</label>
                                </div>
                                
                                <form action="" className='' onClick={handleSubmit} method='dialog'>
                                    <div className='flex flex-wrap mx-auto justify-around border-primary '>
                                        <div className='max-w-sm'>
                                            <p>Joined {moment(currentAccount?.createdAt).fromNow()}</p>
                                            <label className="form-control w-full">
                                                <div className="label">
                                                    <span className="label-text">Username</span>
                                                </div>
                                                <input type='text' placeholder="Type here" name='customerFName' defaultValue={currentAccount?.customerFName} className="input input-bordered " onChange={handleChange} />
                                            </label>

                                            <label className="form-control w-full">
                                                <div className="label">
                                                    <span className="label-text">Email</span>
                                                </div>
                                                <input type='email' placeholder="Type here" name='email' defaultValue={currentAccount?.email} className="input input-bordered " onChange={handleChange} />
                                            </label>

                                            <label className="form-control w-full">
                                                <div className="label">
                                                    <span className="label-text">Role</span>
                                                </div>
                                                <input type='text' placeholder="Type here" name='role' defaultValue={currentAccount?.role} className="input input-bordered " onChange={handleChange} />
                                            </label>

                                            <label className="form-control w-full">
                                                <div className="label">
                                                    <span className="label-text">Contact</span>
                                                </div>
                                                <input type='number' placeholder="Type here" name='contact' defaultValue={currentAccount?.contact} className="input input-bordered " onChange={handleChange} />
                                            </label>

                                            <label className="form-control w-full">
                                                <div className="label">
                                                    <span className="label-text">Account Number</span>
                                                </div>
                                                <p>{currentAccount?.accountNo}</p>
                                            </label>

                                            {/* <p>Last updated on {updatedTime?.toDateString()} at {formattedTime}</p> */}
                                        </div>

                                        <div>
                                            <label className="form-control w-full">
                                                <div className="label">
                                                    <span className="label-text">Address</span>
                                                </div>
                                                <p>Street</p>
                                                <input type='text' placeholder="Type here" name='street' defaultValue={currentAccount?.address.street} className="input input-bordered " onChange={handleChange} />
                                                <p>City</p>
                                                <input type='text' placeholder="Type here" name='city' defaultValue={currentAccount?.address.city} className="input input-bordered " onChange={handleChange} />
                                                <p>Country</p>
                                                <input type='text' placeholder="Type here" name='country' defaultValue={currentAccount?.address.country} className="input input-bordered " onChange={handleChange} />
                                                <p>Zip</p>
                                                <input type='number' placeholder="Type here" name='zip' defaultValue={currentAccount?.address.zip} className="input input-bordered " onChange={handleChange} />
                                            </label>
                                            <div className="mt-4">
                                                <SubmitBtn className='mt-4' text={loading ? 'Updating' : 'Update'} disabled={loading}></SubmitBtn>
                                            </div>
                                        </div>
                                    </div>
                                </form>

                            </div>
                        </div>
                    </div>

            }
        </div>
    )
}

export default Account