import React, { useEffect } from 'react'
import { useState } from 'react';
import { toast } from 'react-toastify';
import axios from 'axios';
const BASE_URL = 'http://localhost:4000'
import { Link } from 'react-router-dom';

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

    return (
        <div>
            {
                loading ? <p>Loading...</p> :
                    <div className='overflow-x-auto'>

                        <table className='table'>
                                
                            <thead>
                                <tr>
                                    <th></th>
                                    <th>Account No</th>
                                    <th>Name</th>
                                    <th>Contact</th>
                                    <td>Email</td>
                                </tr>
                                <tr>
                                    <th><button className='btn-accent btn' onClick={fetchAccount}>Search</button></th>
                                    <th><input type="text" name='accountNo' className='input input-bordered input-sm' onChange={handleChange}/></th>
                                    <th><input type="text" name='customerFName' className='input input-bordered input-sm' onChange={handleChange}/></th>
                    
                                    <th></th>
                                    <th><input type="text" name='email' className='input input-bordered input-sm' onChange={handleChange}/></th>
                                    
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    customers.map((customer, index) => {
                                        return (
                                            <tr>
                                                <td><Link to={`/accounts/${customer._id}`} className='btn btn-secondary'>Go to file</Link></td>
                                                <td>{customer.accountNo}</td>
                                                <td>{customer.customerFName}</td>
                                                <td>{customer.contact}</td>
                                                <td>{customer.email}</td>
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