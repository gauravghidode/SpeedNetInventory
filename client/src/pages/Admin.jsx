import React, { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { toast } from 'react-toastify'
import axios from 'axios'
import { useState } from 'react'
import { useDownloadExcel } from 'react-export-table-to-excel'
import { useRef } from 'react'
import BasicTable from '../components/BasicTable'
const BASE_URL = import.meta.env.VITE_REACT_APP_BASE_URL;


const Admin = () => {

    const [mainArr, setMainArr] = useState([]);
    const [arr, setArr] = useState([]);
    const tableRef = useRef(null);

    const { onDownload } = useDownloadExcel({
        fileName: "main",
        currentTableRef: tableRef.current,
        sheet: 'main'
    });

    async function fetchMain() {
        try {
            const response = await axios({
                method: 'get',
                url: `${BASE_URL}/v1/user/getAllUsers`,
                // url: `http://localhost:4000/v1/account/getAllAccounts`,
            });
            console.log(response);
            setMainArr(response.data);
            setArr(response.data);
            toast.success('request successful');
        }
        catch (e) {
            toast.error("Something went wrong " + e.message);
        }

    }

    useEffect(() => {
        fetchMain();
    }, [])

    return (
        <>
            <button className='btn bg-slate-400' onClick={onDownload}>Download Excel File</button>
            {
                mainArr ?
                    <div>
                        <div className="overflow-x-auto">
                            <table className="table table-pin-rows table-pin-cols table-zebra" ref={tableRef}>
                                {/* head */}
                                <thead>
                                    <tr className=' font-bold text-base'>

                                        <th>Employee Name</th>
                                        <th>Role</th>
                                        <th>Email</th>
                                        <th>Contact</th>
                                        <th></th>

                                        <th>Customer: Edit and Swap</th>
                                        <th>Customer: Swap only</th>
                                        <th>Vendor: Add PhoneNo</th>
                                        <th>Inventory: Swap</th>

                                        <th></th>
                                    </tr>

                                </thead>
                                <tbody>
                                    {
                                        mainArr.map((Tuple, index) => (
                                            <tr key={Tuple._id}>
                                                <th>{Tuple?.username}</th>
                                                <td>{Tuple?.role}</td>  
                                                <td>{Tuple?.email}</td>
                                                <td>{Tuple.contact}</td>
                                                <td></td>
                                                <td><input type="checkbox" className="toggle" checked={Tuple.customerEditAndSwap}/></td>
                                                <td><input type="checkbox" className="toggle" checked={Tuple.customerSwap} /></td>
                                                <td><input type="checkbox" className="toggle" checked={Tuple.vendorfileAdd} /></td>
                                                <td><input type="checkbox" className="toggle" checked={Tuple.inventorySwap} /></td>


                                                <td><Link to={`/profile/${Tuple._id}`} className='btn btn-secondary'>Profile</Link></td>

                                            </tr>
                                        ))
                                    }
                                </tbody>
                            </table>
                        </div>

                        <div className='pt-10'>
                            <h2 className='text-xl'>Account Delete Requests</h2>
                            <table className='table table-zebra border-2 -primary'>
                                <thead>
                                    <th>Account Number</th>
                                    <th>Customer Name</th>
                                    <th></th>
                                </thead>
                                <tbody>
                                    <td></td>
                                    <td></td>
                                    <td></td>
                                </tbody>
                            </table>
                        </div>

                        <div className='pt-10'>
                            <h2 className='text-xl'>Phone Number Delete Requests</h2>
                            <table className='table table-zebra border-2 -primary'>
                                <thead>
                                    <th>Account Number</th>
                                    <th>Customer Name</th>
                                    <th></th>
                                </thead>
                                <tbody>
                                    <td></td>
                                    <td></td>
                                    <td></td>
                                </tbody>
                            </table>
                        </div>
                        
                    </div> :
                    <div>
                        No records found
                    </div>

            }
        </>
    )
}

export default Admin