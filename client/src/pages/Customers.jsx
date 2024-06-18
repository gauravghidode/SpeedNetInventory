import React, { useEffect } from 'react'
import { useState } from 'react';
import { toast } from 'react-toastify';
import axios from 'axios';
import { Link } from 'react-router-dom';
import CustomerRow from '../components/CustomerRow';
import AddAccountBtn from '../components/AddAccountBtn';
import InfiniteScroll from "react-infinite-scroll-component";

const BASE_URL = import.meta.env.VITE_REACT_APP_BASE_URL;

const Customers = () => {

    const [customers, setCustomers] = useState([]);
    const [loading, setLoading] = useState(false);
    // const [formData, setFormData] = useState({ accountNo: "", customerFName: "", email: "" });

    const [hasMore, setHasMore] = useState(true);
    const [keyword, setKeyword] = useState("");
    const [page, setPage] = useState(1);
    const [pageSize, setPageSize] = useState(10);

    // function handleChange(e) {
    //     setFormData({ ...formData, [e.target.name]: e.target.value });
    // }
    async function fetchAccount() {
        try {
            const response = await axios({
                method: 'get',
                url: `${BASE_URL}/v1/account/getCustomerAccounts?keyword=${keyword}&page=${page}&pageSize=${pageSize}`,
            });
            console.log(response);
            setCustomers((prevItems) => [...prevItems, ...response.data])
            response.data.length > 0 ? setHasMore(true) : setHasMore(false);
            toast.success("Customer account fetched successfully");
            setPage(page+1);
        }
        catch (e) {

            toast.error("Something went wrong " + e.message);
        }
    }

    async function fetchAccount2() {
        try {
            setPage(1);
            const response = await axios({
                method: 'get',
                url: `${BASE_URL}/v1/account/getCustomerAccounts?keyword=${keyword}&page=1&pageSize=${pageSize}`,
            });
            console.log(response);
            setCustomers(response.data);
            response.data.length > 0 ? setHasMore(true) : setHasMore(false);
            toast.success("Customer account fetched successfully");
            setPage(page+1);
        }
        catch (e) {

            toast.error("Something went wrong " + e.message);
        }
    }

    console.log(customers);

    useEffect(() => {
        setLoading(true);
        setPage(1);
        fetchAccount2();
        setLoading(false);
    }, [keyword]);
    
    return (
        <div>
            <div className='flex gap-x-4'>
                <AddAccountBtn role={'customer'}></AddAccountBtn>
                <button onClick={fetchAccount} className='btn btn-secondary'>Refresh</button>
                <><input type="text" name='keyword' className='input input-bordered input-sm w-64 input-primary' onChange={(e)=>setKeyword(e.target.value)}/></>
                </div>
            {
                loading ? <p>Loading...</p> :
                    <div className='overflow-x-auto'>

                        <InfiniteScroll
                            dataLength={customers.length}
                            next={fetchAccount}
                            hasMore={hasMore}
                            >
                        <table className='table table-zebra table-pin-rows table-pin-cols'>

                            <thead>
                                <tr className=' font-bold text-base text-black'>
                                    <th></th>
                                    <th>Account No</th>
                                    <th>Name</th>
                                    <td>PhoneNo</td>
                                    <th>ICCID</th>

                                    <td>Plan Type</td>
                                    <td>Supplier</td>
                                    <td>Recurring Status</td>
                                    <td>Account Status</td>



                                </tr>
                                {/* <tr>
                                    <th><button className='btn-accent btn' onClick={fetchAccount2}>Search</button></th>
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
                                                <CustomerRow customer={customer} accno={customer._id}></CustomerRow>
                                            </tr>
                                        )
                                    })
                                }

                            </tbody>
                        </table>

                        </InfiniteScroll>
                    </div>
            }
        </div>
    )
}

export default Customers