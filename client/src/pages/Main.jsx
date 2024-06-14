
import React, { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { toast } from 'react-toastify'
import axios from 'axios'
import { useState } from 'react'
import { useDownloadExcel} from 'react-export-table-to-excel'
import { useRef } from 'react'
import BasicTable from '../components/BasicTable'

const Main = () => {
  
  const [mainArr, setMainArr] = useState([]);
  const [arr, setArr] = useState([]);
  const tableRef = useRef(null);

  const {onDownload} = useDownloadExcel({
    fileName: "main",
    currentTableRef: tableRef.current,
    sheet: 'main'
  });

  async function fetchMain(){
    try{
      const response = await axios({
        method: 'get',
        url: `http://localhost:4000/v1/phoneNo/getAllActiveConnections`,
        // url: `http://localhost:4000/v1/account/getAllAccounts`,
      });
      console.log(response);
      setMainArr(response.data);
      setArr(response.data);
      toast.success('request successful');
    }
    catch(e){
      toast.error("Something went wrong "+e.message);
    }
    
  }

  function searchHandler(){
    setMainArr(arr.filter((tuple)=>{
      tuple.newAccount.accountNo.toString().startsWith(e.target.value)
    }));
  }

  useEffect(()=>{
    fetchMain();
  },[]);
  return (
    <>
    <button className='btn btn-primary' onClick={onDownload}>Download Excel File</button>
      {
        mainArr ?
          <div>
            <div className="overflow-x-auto">
              <table className="table" ref={tableRef}>
                {/* head */}
                <thead>
                  <tr>
                    <th>Account No</th>
                    <th>Customer</th>
                    <th>ICCId</th>
                    <th>Vendor</th>
                    <th>Activation date</th>
                    <th>Recurring Status</th>
                    <th>Account Status</th>
                    <th>Phone No</th>
                    <th></th>
                  </tr>
                  <tr>

                    <th><input className='input input-bordered input-sm input-primary' type="text" onChange={(e)=>setMainArr(arr.filter((tuple)=>tuple.newAccount.accountNo.toString().startsWith(e.target.value)))}/></th>
                    <th><input className='input input-bordered input-sm input-primary' type="text" onChange={(e)=>setMainArr(arr.filter((tuple)=>tuple.newAccount.customerFName.includes(e.target.value)))}/></th>
                    <th><input className='input input-bordered input-sm input-primary' type="text" onChange={(e)=>setMainArr(arr.filter((tuple)=>tuple.newICCID?.ICCID.toString().startsWith(e.target.value)))}/></th>
                    <th><input className='input input-bordered input-sm input-primary' type="text" onChange={(e)=>setMainArr(arr.filter((tuple)=>tuple.vendor.vendorName.includes(e.target.value)))}/></th>
                    <th>Activation date</th>
                    <th>Recurring Status</th>
                    <th>Account Status</th>
                    <th><input className='input input-bordered input-sm input-primary' type="text" onChange={(e)=>setMainArr(arr.filter((tuple)=>tuple.phoneNo.toString().startsWith(e.target.value)))}/></th>
                    <th></th>
                  </tr>
                </thead>
                <tbody>
                {
                  mainArr.map((Tuple, index)=>(
                  <tr key={Tuple._id}>
                    <th>{Tuple?.newAccount?.accountNo}</th>
                    <td>{Tuple?.newAccount?.customerFName} {Tuple?.newAccount?.customerLName}</td>
                    <td>{Tuple.ICCID}</td>
                    <td>{Tuple.vendor.vendorName}</td>
    
                    <td>{Tuple.date}</td>
                    <td>{Tuple.recurringStatus}</td>
                    <td>{Tuple.accountStatus}</td>
                    <td>{Tuple.phoneNo}</td>
                    <td><Link to={`/accounts/${Tuple.newAccount._id}`} className= 'link'>Portal</Link></td>
                  </tr>
                  ))
                }
                </tbody>
                
              </table>
            </div>
            {/* <BasicTable columns={columns} data={mainArr} ref={tableRef}/> */}
          </div> :
          <div>
            No records found
          </div>
          
      }
    </>
  )
}

export default Main