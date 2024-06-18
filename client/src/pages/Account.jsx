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
import { IoMdAdd } from "react-icons/io";
import { Modal } from 'react-responsive-modal'

const BASE_URL = import.meta.env.VITE_REACT_APP_BASE_URL;


const Account = () => {
    const { accno } = useParams();
    console.log(accno);
    const [currentAccount, setCurrentAccount] = useState(undefined);
    const [connections, setConnections] = useState([]);
    const [loading, setLoading] = useState();
    const [loading2, setLoading2] = useState(false);
    const dispatch = useDispatch();
    const [updatedTime, setUpdatedTime] = useState();
    const { currentUser } = useSelector((state) => state.user);
    const [conn, setConn] = useState([]);
    const custody = currentUser.username;


    const [open, setOpen] = useState(false);
    const onOpenModal = () => { setOpen(true) };
    const onCloseModal = () => setOpen(false);

    const [formData, setFormData] = useState({});
    const [formData2, setFormData2] = useState();
    const [formData3, setFormData3] = useState();

    function handleChange(e) {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    }

    function handleChange2(e) {
        setFormData2({ ...formData2, [e.target.name]: e.target.value });
        console.log(formData2);
    }

    async function handleSubmit2(e) {
        e.preventDefault();

        try {
            console.log(formData2);
            const response = await axios({
                method: 'post',
                url: `${BASE_URL}/v1/phoneNo/checkPhoneNumber`,
                data: formData2,
                withCredentials: true
            });
            console.log("Submit");
            console.log(response);
            setFormData3(response.data);
        }
        catch (e) {
            console.log("Something went wrong " + e.message);
            toast.error("Something went wrong " + e.message);
        }
    }

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
            setConn(response.data.connections);
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
                data: { userId, iccId, accId, custody },
                withCredentials: true
            });
            toast.success(response.data.message);
        }
        catch (e) {

            toast.error("Something went wrong " + e.message);
        }
    }

    async function updatePhoneNo(e) {
        e.preventDefault();
        try {
            console.log(formData3);
            const response = await axios({
                method: 'put',
                url: `${BASE_URL}/v1/phoneNo/addConnection/${formData3?.phone._id}`,
                data: { updatedICCID: formData3?.phone.ICCID, updatedAccountNo: currentAccount.accountNo },
                withCredentials: true
            });
            if (response.data.success) {
                await handleSubmit(e);
                toast.success(response.data.message);
            } else {
                toast.warning(response.data.message);
            }
        }
        catch (e) {
            console.log("Something went wrong " + e.message);
            toast.error("Something went wrong " + e.message);
        }
    }


    useEffect(() => {
        fetchAccount();
    }, [])

    return (
        <div>

            {
                loading ? <p>Loading...</p> :

                    <div>
                        <div className='flex justify-between'>
                            <h1 className='text-2xl font-semibold text-center mb-4'>{currentAccount?.customerFName}</h1>
                            <h1 className='text-2xl font-semibold text-center mb-4'>Account No {currentAccount?.accountNo}</h1>
                            <button disabled={!(currentUser.role === 'admin' || currentUser.customerSwap || currentUser.customerEditAndSwap)} className='btn btn-primary' onClick={() => { onOpenModal() }}><IoMdAdd className='h-6 w-6' />Add Connection</button>

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
                                            <th>CPrice</th>
                                            <th></th>
                                        </tr>

                                        <tr>
                                        <th><input className='input input-bordered input-sm input-primary w-full' type="text" onChange={(e)=>setConnections(conn.filter((tuple)=>tuple.ICCID.toString().startsWith(e.target.value)))}/></th>
                                        <th><input className='input input-bordered input-sm input-primary w-full' type="text" onChange={(e)=>setConnections(conn.filter((tuple)=>tuple.phoneNo.toString().startsWith(e.target.value)))}/></th>
                                        <th></th>
                                        <th></th>
                                        <th></th>
                                        <th></th>
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
                                                    <td><input type="date"  disabled defaultValue={Tuple?.cactivationDate?.toString().slice(0,10)}/></td>
                                                    <td>{Tuple?.cprice}</td>
                                                    {/* <td><button>Update</button></td> */}
                                                    <td><button disabled={!(currentUser.role === 'admin' || currentUser.customerSwap || currentUser.customerEditAndSwap)} className='btn btn-secondary' type='button' value={index} onClick={(e) => handleDeactivate(e)}>Deactivate</button></td>


                                                    {/* <td><button value={index} onClick={updateRow}>Update</button></td> */}
                                                </tr>
                                            ))
                                        }
                                    </tbody>

                                </table>
                            </div>
                        </div>




                        <Modal classNames='' open={open} onClose={onCloseModal} center>
                            <h2>Add Connection</h2>
                            {
                                loading ? <p>Loading</p> :
                                    <div>
                                        {
                                            currentAccount &&
                                            <div>
                                                <div className='card'>
                                                    {
                                                        (currentUser.role == 'admin' || currentUser.customerEditAndSwap) &&

                                                        <form action="" className='' onSubmit={handleSubmit}>
                                                            <div className='flex flex-wrap mx-auto justify-around border-primary border-b-2 '>
                                                                <div className='max-w-sm p-10'>


                                                                    <label className="form-control w-full">
                                                                        <div className="label">
                                                                            <span className="label-text">Account No</span>
                                                                        </div>
                                                                        <input type='string' placeholder="Type here" name='accountNo' defaultValue={currentAccount?.accountNo} className="input input-bordered " onChange={handleChange} />
                                                                    </label>

                                                                    <label className="form-control w-full">
                                                                        <div className="label">
                                                                            <span className="label-text">Email</span>
                                                                        </div>
                                                                        <input type='email' placeholder="Type here" name='email' defaultValue={currentAccount?.email} className="input input-bordered " onChange={handleChange} />
                                                                    </label>

                                                                    <label className="form-control w-full">
                                                                        <div className="label">
                                                                            <span className="label-text">Street</span>
                                                                        </div>
                                                                        <input type='text' placeholder="Type here" name='street' defaultValue={currentAccount?.address?.street} className="input input-bordered " onChange={handleChange} />
                                                                    </label>

                                                                    <label className="form-control w-full">
                                                                        <div className="label">
                                                                            <span className="label-text">State</span>
                                                                        </div>
                                                                        <input type='text' placeholder="Type here" name='country' defaultValue={currentAccount?.address?.country} className="input input-bordered " onChange={handleChange} />
                                                                    </label>
                                                                </div>

                                                                <div className='p-10'>
                                                                    <label className="form-control w-full">
                                                                        <div className="label">
                                                                            <span className="label-text">Customer Name</span>
                                                                        </div>
                                                                        <input type='text' placeholder="Type here" name='customerFName' defaultValue={currentAccount?.customerFName} className="input input-bordered " onChange={handleChange} />
                                                                    </label>
                                                                    <label className="form-control w-full">
                                                                        <div className="label">
                                                                            <span className="label-text">Contact</span>
                                                                        </div>
                                                                        <input type='number' placeholder="Type here" name='contact' defaultValue={currentAccount?.contact} className="input input-bordered " onChange={handleChange} />
                                                                    </label>

                                                                    <label className="form-control w-full">
                                                                        <div className="label">
                                                                            <span className="label-text">City</span>
                                                                        </div>
                                                                        <input type='text' placeholder="Type here" name='city' defaultValue={currentAccount?.address?.city} className="input input-bordered " onChange={handleChange} />
                                                                    </label>

                                                                    <label className="form-control w-full">
                                                                        <div className="label">
                                                                            <span className="label-text">Zip</span>
                                                                        </div>
                                                                        <input type='number' placeholder="Type here" name='zip' defaultValue={currentAccount?.address?.zip} className="input input-bordered " onChange={handleChange} />
                                                                    </label>
                                                                    <div className="mt-4 w-1/2 mx-auto">
                                                                        <SubmitBtn className='mt-4' text={loading ? 'Updating' : 'Update'} disabled={loading}></SubmitBtn>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </form>
                                                    }
                                                </div>
                                                
                                                <div className='card'>
                                                    <form action="" onSubmit={updatePhoneNo} className='flex'>
                                                        <div className='p-10'>
                                                            <label className="form-control w-full">
                                                                <div className="label">
                                                                    <span className="label-text">New Phone No</span>
                                                                </div>
                                                                <input type='number' placeholder="Type here" name='phoneNo' className="input input-bordered " onChange={handleChange2} />
                                                            </label>

                                                            {
                                                                formData3?.success &&
                                                                <div>
                                                                    <p>New Phone No: {formData3?.phone.phoneNo}</p>
                                                                    <p>New Plan Type: {formData3?.phone.planType}</p>
                                                                    {formData3?.phone?.accountStatus == 'active' ? <p className='text-red-600'>Phone no is not available</p> : <p className='text-green-600'>'Phone no is available'</p>}

                                                                </div>

                                                            }
                                                            <p className=' text-red-600'>{formData3?.message}</p>


                                                            <button type='button' className='btn btn-secondary mt-4' onClick={handleSubmit2}>Check</button>
                                                        </div>
                                                        <div className='p-10'>
                                                            <label className="form-control w-full">
                                                                <div className="label">
                                                                    <span className="label-text">New ICCID</span>
                                                                </div>
                                                                <input type='string' placeholder="Type here" name='ICCID' className="input input-bordered " onChange={handleChange2} />
                                                            </label>
                                                            {
                                                                formData3?.success &&
                                                                <div>
                                                                    <p>New ICCID: {formData3?.phone.ICCID}</p>
                                                                    <p>New Vendor: {formData3?.phone.vendor?.vendorName}</p>
                                                                </div>

                                                            }

                                                            <div className="mt-4 w-1/2 mx-auto">
                                                                <SubmitBtn className='mt-4' text={loading2 ? 'Updating' : 'Update'} disabled={!formData3 || !formData3.success || formData3?.phone?.accountStatus == 'active'}></SubmitBtn>
                                                            </div>
                                                        </div>
                                                    </form>

                                                </div>
                                            </div>
                                        }


                                    </div>
                            }
                        </Modal>

                    </div>

            }
        </div>
    )
}

export default Account