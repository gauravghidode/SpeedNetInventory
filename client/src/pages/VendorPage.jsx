import React, { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { toast } from 'react-toastify'
import axios from 'axios'
import { useState } from 'react'
import Select from 'react-select';
import { useSelector } from 'react-redux'
import DatePicker from 'react-datepicker'
import * as XLSX from 'xlsx';
const BASE_URL = import.meta.env.VITE_REACT_APP_BASE_URL;

const VendorPage = () => {

    const [vendors, setVendors] = useState([]);
    const [loading, setLoading] = useState(true);  

    async function getVendors() {
        try {
            setLoading(true);
          const response = await axios({
            method: 'get',
            url: `${BASE_URL}/v1/card/vendors`,
          });
          console.log(response);
          setVendors(response.data);
          // toast.success('');
        }
        catch (e) {
          toast.error("Something went wrong in fetching vendor list " + e.message);
        }
        setLoading(false);
      }

      useEffect(() => {
        getVendors();
      }, []);

  
  return (
    <div>
            {
                loading ? <p>Loading...</p> :
                    <div className='overflow-x-auto'>

                        <table className='table table-fixed table-pin-rows table-pin-cols'>
                            <thead>
                                <tr>
                                    <th></th>
                                    <th>Vendor Name</th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    vendors.map((vendor, index) => {
                                        return (
                                            <tr>
                                                <td><Link to={`/vendor/${vendor._id}`} className='btn btn-secondary'>Go to file</Link></td>
                                                <td>{vendor.vendorName}</td>
                                                
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

export default VendorPage