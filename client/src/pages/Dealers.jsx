import React, { useEffect } from 'react'
import { useState } from 'react';
import { toast } from 'react-toastify';
import axios from 'axios';
const BASE_URL = 'http://localhost:4000'
import { Link } from 'react-router-dom';

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