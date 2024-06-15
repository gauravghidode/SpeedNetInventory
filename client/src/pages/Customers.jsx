import React, { useEffect } from 'react'
import { useState } from 'react';
import { toast } from 'react-toastify';
import axios from 'axios';
import { Link } from 'react-router-dom';
import EditAccountBtn from '../components/EditAccountBtn';

const BASE_URL = import.meta.env.VITE_REACT_APP_BASE_URL;

const Customers = () => {

    const [customers, setCustomers] = useState([]);
    const [loading, setLoading] = useState(false);
    const [formData, setFormData] = useState({accountNo:"", customerFName:"", email:""});
    function handleChange(e) {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    }
    async function fetchAccount() {
        try {
            const response = await axios({
                method: 'get',
                url: `${BASE_URL}/v1/account/getCustomerAccounts?accountNo=${formData.accountNo}&customerFName=${formData.customerFName}&email=${formData.email}`,
            });
            console.log(response);
            setCustomers(response.data);
            toast.success("Customer account fetched successfully");
        }
        catch (e) {

            toast.error("Something went wrong " + e.message);
        }
    }

    useEffect(() => {
        setLoading(true);
        fetchAccount();
        setLoading(false);
    }, [])
    console.log(customers);
    return (
        <div>
            {
                loading ? <p>Loading...</p> :
                    <div className='overflow-x-auto'>
                        <div class="mockup-window border bg-base-300">
  <div class="flex justify-center px-4 py-16 bg-base-200">Hello!</div>
</div>

                        <table className='table table-zebra table-fixed'>
                                
                            <thead>
                                <tr>
                                    
                                    <th>Account No</th>
                                    <th>Name</th>
                                    <td>PhoneNo</td>
                                    <th>ICCID</th>

                                    <td>Plan Type</td>
                                    <td>Supplier</td>
                                    <td>Account Status</td>
                                    <th></th>
                                    <td></td>
                                </tr>
                                {/* <tr>
                                    <th><button className='btn-accent btn' onClick={fetchAccount}>Search</button></th>
                                    <th><input type="text" name='accountNo' className='input input-bordered input-sm w-full' onChange={handleChange}/></th>
                                    <th><input type="text" name='customerFName' className='input input-bordered input-sm w-full' onChange={handleChange}/></th>
                                    <th></th>
                                    <th><input type="text" name='email' className='input input-bordered input-sm w-full' onChange={handleChange}/></th>
                                    
                                </tr> */}
                            </thead>
                            <tbody>
                                {
                                    customers.map((customer, index) => {
                                        return (
                                            <tr>
                                                <td>{customer.accountNo}</td>
                                                <td>{customer.customerFName}</td>
                                                <td>{customer.phoneNo?.phoneNo}</td>
                                                <td>{customer.phoneNo?.ICCID}</td>
                                                <td>{customer.phoneNo?.planType}</td>
                                                <td>{customer.phoneNo?.vendor?.vendor}</td>
                                                <td>{customer.phoneNo?.accountStatus}</td>
                                                <td><EditAccountBtn customer={customer} accno={customer._id}></EditAccountBtn> </td>
                                                <td><Link to={`/accounts/${customer._id}`} className='btn'>Profile</Link></td>

                                            </tr>
                                        )
                                    })
                                }

                            </tbody>
                        </table>


                    </div>
            }
        </div>
    )
}

export default Customers