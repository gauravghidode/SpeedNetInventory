
import React, { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { toast } from 'react-toastify'
import axios from 'axios'
import { useState } from 'react'
import { useDownloadExcel } from 'react-export-table-to-excel'
import { useRef } from 'react'
import InfiniteScroll from "react-infinite-scroll-component";
const BASE_URL = import.meta.env.VITE_REACT_APP_BASE_URL;

const Main = () => {

  const [mainArr, setMainArr] = useState([]);
  const [arr, setArr] = useState([]);
  const tableRef = useRef(null);
  const [keyword, setKeyword] = useState("");
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);


  const [hasMore, setHasMore] = useState(true);


  const { onDownload } = useDownloadExcel({
    fileName: "main",
    currentTableRef: tableRef.current,
    sheet: 'main'
  });

  async function fetchMain() {
    try {
      const response = await axios({
        method: 'get',
        url: `${BASE_URL}/v1/phoneNo/getAllActiveConnections?keyword=${keyword}&page=${page}&pageSize=${pageSize}`,
        // url: `http://localhost:4000/v1/account/getAllAccounts`,
      });
      console.log(response);
      setMainArr((prevItems) => [...prevItems, ...response.data])
      setArr(response.data);
      response.data.length > 0 ? setHasMore(true) : setHasMore(false);
      // toast.success('request successful');
      setPage(page + 1);
    }
    catch (e) {
      toast.error("Something went wrong " + e.message);
    }

  }

  async function fetchMain2() {
    try {
      const response = await axios({
        method: 'get',
        url: `${BASE_URL}/v1/phoneNo/getAllActiveConnections?keyword=${keyword}&page=1&pageSize=${pageSize}`,
        // url: `http://localhost:4000/v1/account/getAllAccounts`,
      });
      console.log(response);
      setArr(response.data)
      setMainArr(response.data);
      response.data.length > 0 ? setHasMore(true) : setHasMore(false);
      toast.success('request successful');
    }
    catch (e) {
      toast.error("Something went wrong " + e.message);
    }

  }





  useEffect(() => {
    setPage(1);
    fetchMain2();
  }, [keyword]);
  return (
    <>
      <button className='btn bg-slate-400' onClick={onDownload}>Download Excel File</button>
      <input className='input input-bordered input-primary input-sm w-64' type="text" onChange={(e) => { setKeyword(e.target.value) }} />

      
      {
        mainArr && mainArr.length > 0 ?
          <div>
            <div className="overflow-x-auto">
              <InfiniteScroll
                dataLength={mainArr.length}
                next={fetchMain}
                hasMore={hasMore}
              >
                <table className="table table-pin-rows table-pin-cols table-zebra" ref={tableRef}>
                  {/* head */}
                  <thead>
                    <tr className=' font-bold text-base text-black'>
                      <th>Account No</th>
                      <th>Customer</th>
                      <th>Role</th>
                      <th>Phone No</th>
                      <th>ICCId</th>
                      <th>Plan Type</th>
                      <th>Supplier</th>
                      <th>Activation date</th>
                      <th>Recurring Status</th>

                      <th></th>
                    </tr>
                    {/* <tr className=''>

                    <th><input className='input input-bordered input-primary input-sm w-full' type="text" onChange={(e)=>setMainArr(arr.filter((tuple)=>tuple.newAccount.accountNo.toString().startsWith(e.target.value)))}/></th>
                    <th><input className='input input-bordered input-sm input-primary w-full' type="text" onChange={(e)=>setMainArr(arr.filter((tuple)=>tuple.newAccount.customerFName.toLowerCase().includes(e.target.value.toLowerCase())))}/></th>
                    <th><select defaultValue='' className='input input-bordered input-sm input-primary w-full' type="text" onChange={(e)=>setMainArr(arr.filter((tuple)=>tuple.newAccount.role.includes(e.target.value)))}>
                      <option value="" defaultChecked>Both</option>
                      <option value="customer">Customer</option>
                      <option value="dealer">Dealer</option>
                      </select>
                    </th>
                    <th><input className='input input-bordered input-sm input-primary w-full' type="text" onChange={(e)=>setMainArr(arr.filter((tuple)=>tuple.phoneNo.toString().startsWith(e.target.value)))}/></th>
                    <th><input className='input input-bordered input-sm input-primary w-full' type="text" onChange={(e)=>setMainArr(arr.filter((tuple)=>tuple.ICCID.toString().startsWith(e.target.value)))}/></th>
                    <th></th>
                    <th><input className='input input-bordered input-sm input-primary w-full' type="text" onChange={(e)=>setMainArr(arr.filter((tuple)=>tuple.vendor.vendorName.includes(e.target.value)))}/></th>
                    
                    <th></th>
                    <th></th>
                    <th></th>
                  </tr> */}
                  </thead>

                  <tbody>
                    {
                      mainArr.map((Tuple, index) => (
                        <tr key={Tuple?._id}>
                          <th>{Tuple?.newAccount?.accountNo}</th>
                          <td>{Tuple?.newAccount?.customerFName} {Tuple?.newAccount?.customerLName}</td>
                          <td className='capitalize'>{Tuple?.newAccount?.role}</td>
                          <td>{Tuple.phoneNo}</td>
                          <td>{Tuple.ICCID}</td>
                          <td>{Tuple.planType}</td>
                          <td>{Tuple.vendor.vendorName}</td>

                          <td>{Tuple.date}</td>
                          <td className='capitalize'>{Tuple.recurringStatus}</td>


                          <td><Link className='btn btn-secondary' to={`/accounts/${Tuple?.newAccount?._id}`}>Profile</Link></td>
                        </tr>
                      ))
                    }
                  </tbody>


                </table>
              </InfiniteScroll>
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