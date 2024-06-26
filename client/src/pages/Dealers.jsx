import React, { useEffect } from 'react'
import { useState } from 'react';
import { toast } from 'react-toastify';
import axios from 'axios';
const BASE_URL = import.meta.env.VITE_REACT_APP_BASE_URL;
import { Link } from 'react-router-dom';
import AddAccountBtn from '../components/AddAccountBtn';

const Dealers = () => {

    const [dealers, setDealers] = useState([]);
    const [loading, setLoading] = useState(false);
    async function fetchAccount() {
        try {
            const response = await axios({
                method: 'get',
                url: `${BASE_URL}/v1/account/getDealerAccounts`,
            });
            console.log(response);
            setDealers(response.data);
            toast.success("Dealer account fetched successfully");
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
            <div className='flex gap-x-4'>
                <AddAccountBtn role={'dealer'}></AddAccountBtn>
                <button onClick={fetchAccount} className='btn btn-secondary'>Refresh</button>

            </div>
            {
                loading ? <p>Loading...</p> :
                    <div className='overflow-x-auto'>

                        <table className='table'>
                            <thead>
                                <tr className=' font-bold text-base text-black'>
                                    <th></th>
                                    <th>Account No</th>
                                    <th>Name</th>
                                    <th>Contact</th>
                                    <td>Email</td>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    dealers.map((dealer, index) => {
                                        return (
                                            <tr>
                                                <td><Link to={`/accounts/${dealer._id}`} className='btn btn-secondary'>Go to file</Link></td>
                                                <td>{dealer.accountNo}</td>
                                                <td>{dealer.customerFName}</td>
                                                <td>{dealer.contact}</td>
                                                <td>{dealer.email}</td>
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

export default Dealers