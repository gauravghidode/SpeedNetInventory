import React, { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { toast } from 'react-toastify'
import axios from 'axios'
import { useState } from 'react'
import moment from 'moment';
const BASE_URL = import.meta.env.VITE_REACT_APP_BASE_URL;
import InventoryRow from '../components/InventoryRow'

const Inventory = () => {

  const [mainArr, setMainArr] = useState([]);

  async function fetchMain(){
    try{
      const response = await axios({
        method: 'get',
        url: `${BASE_URL}/v1/phoneNo/getAllPhoneNo`,
      });
      // console.log(response);
      setMainArr(response.data);
      toast.success('request successful');
    }
    catch(e){
      toast.error("Something went wrong "+e.message);
    }
    
  }


  useEffect(()=>{
    fetchMain();
  },[]);

  return (
    <>
      {
        mainArr ?
          <div>
            <div className="overflow-x-auto">
              <table className="table">
                {/* head */}
                <thead>
                  <tr>
                    <td></td>
                    <th>Phone NO</th>
                    <th>Plan Type</th>
                    <th>Supplier</th>
                    <th>Current ICCID</th>

                    {/* <th>Old Customer Name</th> */}
                  
                    <th>Custody</th>
                    <th>Tech Associate</th>
                    <th>Last update</th>
                  </tr>
                </thead>
                <tbody>
                {
                  mainArr.map((Tuple, index)=>(
                      <InventoryRow Tuple={Tuple} fetchMain={fetchMain}></InventoryRow>
                  ))
                }
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

export default Inventory