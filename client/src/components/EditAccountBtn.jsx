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

const EditAccountBtn = ({ customer, accno }) => {
    // console.log(customer);
    const [open, setOpen] = useState(false);
    const onOpenModal = () => { setOpen(true) };
    const onCloseModal = () => setOpen(false);

    const [currentAccount, setCurrentAccount] = useState(customer);
    // console.log(currentAccount);
    const [loading, setLoading] = useState(false);
    const [loading2, setLoading2] = useState(false);
    const [formData, setFormData] = useState();

    function handleChange(e) {
        setFormData({ ...formData, [e.target.name]: e.target.value });
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

    useEffect(()=>{
        setCurrentAccount(customer);
    })

    return (
        <div>

            <button onClick={() => { onOpenModal() }}><FaUserPen className='h-6 w-6' /></button>

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
                                    <p>Vendor Name: {currentAccount.phoneNo?.vendor.vendorName}</p>
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
                                <form action="" className='flex'>
                                    <div className='p-10'>
                                        <label className="form-control w-full">
                                            <div className="label">
                                                <span className="label-text">New Phone No</span>
                                            </div>
                                            <input type='number' placeholder="Type here" name='contact' defaultValue={currentAccount?.phoneNo?.phoneNo} className="input input-bordered " onChange={handleChange} />
                                        </label>

                                        <button className='btn btn-secondary mt-4'>Check</button>
                                    </div>
                                    <div className='p-10'>
                                        <label className="form-control w-full">
                                            <div className="label">
                                                <span className="label-text">New ICCID</span>
                                            </div>
                                            <input type='string' placeholder="Type here" name='contact' defaultValue={currentAccount?.phoneNo?.ICCID} className="input input-bordered " onChange={handleChange} />
                                        </label>
                                        <div className="mt-4 w-1/2 mx-auto">
                                            <SubmitBtn className='mt-4' text={loading2?'Updating': 'Update'} disabled={loading2}></SubmitBtn>
                                        </div>
                                    </div>
                                </form>

                            </div>

                        </div>
                }
            </Modal>




        </div>
    )
}

export default EditAccountBtn