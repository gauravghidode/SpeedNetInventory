import React, { useEffect } from 'react'
import { FaUserPen } from 'react-icons/fa6'
import moment from 'moment';
import { useState } from 'react';
import SubmitBtn from './SubmitBtn';
import { toast } from 'react-toastify';
import axios from 'axios';
const BASE_URL = import.meta.env.VITE_REACT_APP_BASE_URL;
import 'react-responsive-modal/styles.css';
import { Modal } from 'react-responsive-modal';
import { useSelector } from 'react-redux';

const EditAccountBtn = ({ customer, accno }) => {
    // console.log(customer);
    const [open, setOpen] = useState(false);
    const onOpenModal = () => { setOpen(true) };
    const onCloseModal = () => setOpen(false);
    const {currentUser} = useSelector((state)=>state.user);
console.log(currentUser);

    const [currentAccount, setCurrentAccount] = useState(customer);
    // console.log(currentAccount);
    const [loading, setLoading] = useState(false);
    const [loading2, setLoading2] = useState(false);
    const [formData, setFormData] = useState();
    const [formData2, setFormData2] = useState();
    const [formData3, setFormData3] = useState();

    function handleChange(e) {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    }

    function handleChange2(e) {
        setFormData2({ ...formData2, [e.target.name]: e.target.value });
        console.log(formData2);
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
            setCurrentAccount(response.data);
        }
        catch (e) {

            toast.error("Something went wrong " + e.message);
        }
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

    async function handleDeactivate(e) {
        try {
    
            const id = currentAccount.phoneNo._id
            const userId = currentUser._id
            const accId = currentAccount._id;
            const iccId = currentAccount.phoneNo.ICCID;
            const response = await axios({
                method: 'put',
                url: `${BASE_URL}/v1/phoneNo/deactivateConnection/${id}`,
                data: { userId, iccId, accId },
                withCredentials: true
            });
            if(response.data.success) {
                await handleSubmit(e);
                toast.success(response.data.message);
            }
        }
        catch (e) {

            toast.error("Something went wrong " + e.message);
        }
    }

    useEffect(() => {
        setCurrentAccount(customer);
    },[]);

    return (
        <>

           
                <td><button onClick={() => { onOpenModal() }}><FaUserPen className='h-6 w-6' /></button></td>
                <td>{currentAccount.accountNo}</td>
                <td>{currentAccount.customerFName}</td>
                <td>{currentAccount.phoneNo?.phoneNo}</td>
                <td>{currentAccount.phoneNo?.ICCID}</td>
                <td>{currentAccount.phoneNo?.planType}</td>
                <td>{currentAccount.phoneNo?.vendor?.vendorName}</td>
                <td className='capitalize'>{currentAccount.phoneNo?.recurringStatus}</td>
                <td className='capitalize'>{currentAccount.phoneNo?.accountStatus}</td>

           
            <Modal classNames='' open={open} onClose={onCloseModal} center>
                <h2>Edit Profile</h2>
                {
                    loading ? <p>Loading</p> :
                        <div>
                            <div className=' flex border-b-2 border-primary'>
                                <div className='p-10'>
                                    <p>Account No: {currentAccount.accountNo}</p>
                                    <p>Phone No: {currentAccount.phoneNo?.phoneNo}</p>
                                    <p>Plan Type: {currentAccount.phoneNo?.planType}</p>
                                    <p>Joined {moment(currentAccount?.createdAt).fromNow()}</p>
                                </div>
                                <div className='p-10'>
                                    <p>Customer Name: {currentAccount.customerFName}</p>
                                    <p>ICCID: {currentAccount.phoneNo?.ICCID}</p>
                                    <p>Vendor Name: {currentAccount.phoneNo?.vendor?.vendorName}</p>
                                    <button onClick={handleDeactivate} className='btn btn-secondary mt-4' disabled={!currentAccount?.phoneNo?.accountStatus || currentAccount?.phoneNo?.accountStatus==='inactive'}>Deactivate Connection</button>
                                </div>
                            </div>


                            <div className='card'>
                                <form action="" className='' onSubmit={handleSubmit}>
                                    <div className='flex flex-wrap mx-auto justify-around border-primary border-b-2 '>
                                        <div className='max-w-sm p-10'>


                                            <label className="form-control w-full">
                                                <div className="label">
                                                    <span className="label-text">Account No</span>
                                                </div>
                                                <input type='number' placeholder="Type here" name='contact' defaultValue={currentAccount?.accountNO} className="input input-bordered " onChange={handleChange} />
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
            </Modal>




        </>
    )
}

export default EditAccountBtn