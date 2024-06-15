import React, { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { toast } from 'react-toastify'
import axios from 'axios'
import { useState } from 'react'
import Select from 'react-select';
import { useSelector } from 'react-redux'
import DatePicker from 'react-datepicker'
import * as XLSX from 'xlsx';
import { useParams } from 'react-router-dom'
const BASE_URL = import.meta.env.VITE_REACT_APP_BASE_URL;


const Vendor = () => {
  const {id} = useParams();

  const [mainArr, setMainArr] = useState([]);
  
  const [vendor, setVendor] = useState(undefined);
  const vendorId = id;
  const [formData, setFormData] = useState({});
  const optionList = [];
  const { currentUser } = useSelector((state) => state.user);

  function handleChange(e) {
    setFormData({ ...formData, [e.target.name]: e.target.value });

    console.log(formData);
  }

  async function updateRow(e) {
    var index = (e.target.value);
    var newICCID = (mainArr[index].newICCID.ICCID);
    var newAccount = (mainArr[index].newAccount);
    var id = (mainArr[index]._id);

    try {
      const response = await axios({
        method: 'put',
        url: `${BASE_URL}/v1/phoneNo/update/${id}`,
        data: {
          updatedICCID: newICCID,
          updatedAccount: newAccount
        }
      });
      console.log(response);
      toast.success('update successful');
      fetchMain();
    }
    catch (e) {
      toast.error("Update failed " + e.message);
    }
  }



  async function fetchMain() {
    try {
      setFormData({ ...formData, lastUser: currentUser._id, vendor: vendorId});
      const response = await axios({
        method: 'get',
        url: `${BASE_URL}/v1/phoneNo/getVendorPhoneNo/${vendorId}`,
      });
      console.log(response);
      setMainArr(response.data);
      toast.success('request successful');
    }
    catch (e) {
      toast.error("Something went wrong " + e.message);
    }

  }

  

  async function addEntry() {
    setFormData({ ...formData, vendor: vendorId });
    try {
      const response = await axios({
        method: 'post',
        url: `${BASE_URL}/v1/phoneNo/add`,
        data: formData
      });
      console.log(response);
      if(response.data.success) {
        toast.success(response.data.message);
      }else{
        toast.warning(response.data.message);
      }
    } 
    catch (e) {
      toast.error("Something went wrong " + e.message);
    }
  }

  console.log(mainArr);
  useEffect(() => {
    fetchMain();
  }, []);



  // function handleFileUpload(e){
  //   const reader = new FileReader();
  //   reader.readAsText(e.target.files;
  //   reader.readAsBinaryString(e.target.files);
  //   reader.onload=(e)=>{
  //     const data = e.target.result;
  //     const workbook = XLSX.read(data, { type: "binary" });
  //     const sheetName = workbook.SheetNames[0];
  //     const sheet = workbook.Sheets[sheetName];
  //     const parsedData = XLSX.utils.sheet_to_json(sheet);
  //     console.log(parsedData);
  //   }
  // }

  return (
    <>
      {/* <input type="file" onChange={handleFileUpload} /> */}
      {
        mainArr ?
          <div>
            {
            
              <div className="overflow-x-auto">
                <table className="table">
                  {/* head */}
                  <thead>
                    <tr>
                      {/* <th></th> */}
                      <th>Plan Type</th>
                      <th>ICCID</th>
                      <th>Phone No</th>
                      <th>Price</th>
                      <th>Date</th>
                      <th>Customer Name</th>
                      <th>Account No.</th>
                      <th></th>
                    </tr>
                  </thead>
                  <tbody>
                    {
                      mainArr.map((Tuple, index) => (
                        <tr key={Tuple._id}>
                          
                          <td><input type='text' onChange={(e) => mainArr[index].planType = e.target.value} defaultValue={Tuple?.planType}></input></td>
                          
                          <td><input type="text" defaultValue={Tuple?.ICCID} onChange={(e)=> mainArr[index].ICCID = e.target.value}/></td>
                          <td>{Tuple?.phoneNo}</td>
                          <td>$<input type='number' onChange={(e) => mainArr[index].tuplePrice = e.target.value} defaultValue={Tuple?.price}></input></td>
                          {
                          console.log(new Date(Tuple.date).getFullYear()+'-'+new Date(Tuple.date).getMonth()+'-'+new Date(Tuple.date).getDate())}
                          <td><input type='date' name="" id="" defaultValue='2014-02-02'/></td>
                        
                          <td>{Tuple?.accountStatus==='active'?<>{Tuple?.newAccount?.customerFName}</>:<>-</>}</td>
                          <td>{Tuple?.accountStatus==='active'?<>{Tuple?.newAccount?.accountNo}</>:<>-</>}</td>
                          <td><button className='btn btn-secondary' value={index} onClick={updateRow}>Update</button></td>
                        </tr>
                      ))
                    }
                    <tr>
                      <td><input onChange={handleChange} name='planType' type='text' className='input input-bordered'></input></td>
                      <td><input onChange={handleChange} name='ICCID' type='text' className='input input-bordered'></input></td>
                      <td><input onChange={handleChange} name='phoneNo' type='text' className='input input-bordered'></input></td>
                      <td><input onChange={handleChange} name='price' type='number' className='input input-bordered'></input></td>
                      <td><input onChange={handleChange} name='date' type='text' className='input input-bordered'></input></td>
                      <td></td>
                      <td></td>
                      <td><button value='' onClick={addEntry} className='btn btn-accent'>Add</button></td>
                    </tr>
                  </tbody>
                </table>
              </div>
            }
          </div> :
          <div>
            No records found
          </div>
      }
    </>
  )
}

export default Vendor