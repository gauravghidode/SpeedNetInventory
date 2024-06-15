import React from 'react'
import { FaUserPen } from 'react-icons/fa6'
import moment from 'moment';
import { useState } from 'react';
import SubmitBtn from './SubmitBtn';
import { toast } from 'react-toastify';
import axios from 'axios';
const BASE_URL = import.meta.env.VITE_REACT_APP_BASE_URL;
import 'react-responsive-modal/styles.css';
import { Modal } from 'react-responsive-modal';

const EditAccountBtn = ({customer, accno }) => {
    // console.log(customer);
    const [open, setOpen] = useState(false);
    const onOpenModal = () => {setOpen(true)};
    const onCloseModal = () => setOpen(false);

    const [currentAccount, setCurrentAccount] = useState(customer);
    // console.log(currentAccount);
    const [loading, setLoading] = useState(false);
    const [formData, setFormData] = useState();

    function handleChange(e) {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    }

    // async function fetchAccount() {
    //     try {
    //         setLoading(true);
    //         const response = await axios({
    //             method: 'get',
    //             url: `${BASE_URL}/v1/account/getAccountById/${accno}`,
    //             data: formData,
    //         });
    //         console.log(response);
    //         setCurrentAccount(response.data.account);
    //         setFormData({
    //             accountNo: response.data.account.accountNo,
    //             customerFName: response.data.account.customerFName,
    //             email: response.data.account.email,
    //             role: response.data.account.role,
    //             contact: response.data.account.contact,
    //             street:response.data.account.address.street
    //         })
    //         setLoading(false);
    //         // setUpdatedTime(new Date(currentAccount?.updatedAt))
    //         toast.success("Customer account fetched successfully");
            
    //     }
    //     catch (e) {

    //         toast.error("Something went wrong " + e.message);
    //     }
    // }

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

    return (
        <div>

            <button onClick={()=>{ onOpenModal()}}><FaUserPen className='h-10 w-10'/></button>

            <Modal classNames='' open={open} onClose={onCloseModal} center>
                <h2>Edit Profile</h2>
                {
                    loading ? <p>Loading</p> :
                        <form action="" className='' onSubmit={handleSubmit} method='dialog'>
                            <div className='flex flex-wrap mx-auto justify-around border-primary '>
                                <div className='max-w-sm p-10'>
                                    <p>Joined {moment(currentAccount?.createdAt).fromNow()}</p>
                                    <label className="form-control w-full">
                                        <div className="label">
                                            <span className="label-text">Username</span>
                                        </div>
                                        <input type='text' placeholder="Type here" name='customerFName' defaultValue={currentAccount?.customerFName} className="input input-bordered " onChange={handleChange} />
                                    </label>

                                    <label className="form-control w-full">
                                        <div className="label">
                                            <span className="label-text">Phone No</span>
                                        </div>
                                        <input type='number' placeholder="Type here" name='contact' defaultValue={currentAccount?.phoneNo?.phoneNo} className="input input-bordered " onChange={handleChange} />
                                    </label>

                                    <label className="form-control w-full">
                                        <div className="label">
                                            <span className="label-text">ICCID</span>
                                        </div>
                                        <input type='number' placeholder="Type here" name='contact' defaultValue={currentAccount?.phoneNo?.ICCID} className="input input-bordered " onChange={handleChange} />
                                    </label>

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

                                    {/* <p>Last updated on {updatedTime?.toDateString()} at {formattedTime}</p> */}
                                </div>

                                <div className='p-10'>
                                    <label className="form-control w-full">
                                        <div className="label">
                                            <span className="label-text">Address</span>
                                        </div>
                                        <p>Street</p>
                                        <input type='text' placeholder="Type here" name='street' defaultValue={currentAccount?.address?.street} className="input input-bordered " onChange={handleChange} />
                                        <p>City</p>
                                        <input type='text' placeholder="Type here" name='city' defaultValue={currentAccount?.address?.city} className="input input-bordered " onChange={handleChange} />
                                        <p>Country</p>
                                        <input type='text' placeholder="Type here" name='country' defaultValue={currentAccount?.address?.country} className="input input-bordered " onChange={handleChange} />
                                        <p>Zip</p>
                                        <input type='number' placeholder="Type here" name='zip' defaultValue={currentAccount?.address?.zip} className="input input-bordered " onChange={handleChange} />
                                    </label>
                                    <div className="mt-4">
                                        <SubmitBtn className='mt-4' text={loading ? 'Updating' : 'Update'} disabled={loading}></SubmitBtn>
                                    </div>
                                </div>
                            </div>
                        </form>
                }
            </Modal>
            


          
        </div>
    )
}

export default EditAccountBtn