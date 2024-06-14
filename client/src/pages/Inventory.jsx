import React, { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { toast } from 'react-toastify'
import axios from 'axios'
import { useState } from 'react'
import moment from 'moment';

const Inventory = () => {

  const [mainArr, setMainArr] = useState([]);
  const [arr, setArr] = useState([]);

  async function checkCustomer(e){
    var index = e.target.value;
    var newAccountNo = (mainArr[index].tempAccNo);
    try{
      const response = await axios({
        method: 'get',
        url: `http://localhost:4000/v1/account/checkAccount/${newAccountNo}`,
      });
      // console.log(response);
      toast.success('Account holder: ' + response?.data.customerFName + ' ' + response?.data?.customerLName);
      // mainArr[index].tempCustomer = response.data.customerFName;
      // const id = mainArr[index]._id;
      // setMainArr(
      //   mainArr.map((item) => {
      //     console.log(id,item._id);
      //       item._id === id 
      //       ? {...item, tempCustomer : "changed"}
      //       : item 
      //   }
      // ))
      console.log(mainArr[index].tempCustomer);
    }
    catch(e){
      toast.error("Account not found "+e.message);
    }
  }

  async function updateRow(e){
    var index = (e.target.value);
    var newICCID = (mainArr[index].ICCID);
    var newAccountNo = (mainArr[index].tempAccNo);
    var id = (mainArr[index]._id);

    try{
      const response = await axios({
        method: 'put',
        url: `http://localhost:4000/v1/phoneNo/addConnection/${id}`,
        data: {
          updatedICCID: newICCID,
          updatedAccountNo: newAccountNo
        }
      });
        console.log(response);
        if(response.data.success) {
        toast.success('update successful');
        fetchMain();
      }
      else{
        toast.warning("Update failed! "+ response.data.message);
      }
    }catch(e){
      toast.error("Something went wrong "+e.message);
    } 
    
  }

  async function fetchMain(){
    try{
      const response = await axios({
        method: 'get',
        url: `http://localhost:4000/v1/phoneNo/getAllPhoneNo`,
      });
      // console.log(response);
      setMainArr(response.data);
      setArr(response.data);
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
                    
                    <th>Phone NO</th>
                    <th>Plan Type</th>
                    <th>Supplier</th>
                    <th>Current ICCID</th>

                    <th>New ICCID</th>
                    <th>Old Customer Name</th>
                    <th>New Customer Account No.</th>
                    <th>New Customer Name</th>
                    <th></th>
                    <th>Tech Associate</th>
                    <th>Last update</th>
                  </tr>
                </thead>
                <tbody>
                {
                  mainArr.map((Tuple, index)=>(
                  <tr key={Tuple._id} id={index}>
                    <td>{Tuple?.phoneNo}</td>
                    <td>{Tuple?.planType}</td>
                    <th>{Tuple?.vendor?.vendorName}</th>
                    <td>{Tuple?.ICCID}</td>
                    <td><input className='input input-bordered input-sm' type='text' onChange={(e)=>mainArr[index].ICCID = e.target.value} ></input></td>
                    <td>{Tuple?.newAccount?.customerFName}</td>
                    <td><input className='input input-bordered input-sm' type='text' onChange={(e)=>mainArr[index].tempAccNo = e.target.value}></input></td>
                    <td><button value={index} onClick={checkCustomer}>{Tuple.tempCustomer}</button></td>
                    
                    <td><button value={index} onClick={updateRow}>Update</button></td>
                    <th>{Tuple?.lastUser?.username}</th>
                    <th>{moment(Tuple.createdAt).fromNow()}</th>
                  </tr>
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