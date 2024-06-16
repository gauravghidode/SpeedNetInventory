import React, { useEffect } from 'react'
import moment from 'moment'
import Select from 'react-select'
import { MdEdit } from "react-icons/md";
import { useState } from 'react';
import { useSelector } from 'react-redux';
import { Modal } from 'react-responsive-modal';
import axios from 'axios';
import { toast } from 'react-toastify';
const BASE_URL = import.meta.env.VITE_REACT_APP_BASE_URL;

const options = [
    { label: 'SpeedNet', value: "SpeedNet" },
    { label: "Meena", value: "Meena" },
    { label: "NIL", value: "NIL" }
]

const InventoryRow = ({ Tuple, fetchMain }) => {

    const [formData2, setFormData2] = useState();
    const [formData3, setFormData3] = useState();
    const [loading, setLoading] = useState();
    const [connection, setConnection] = useState();

    const [open, setOpen] = useState(false);
    const onOpenModal = () => { setOpen(true) };
    const onCloseModal = () => setOpen(false);
    const { currentUser } = useSelector((state) => state.user);
    const [optionList, setOptionList] = useState([]);


    function handleChange2(e) {
        setFormData2({ ...formData2, [e.target.name]: e.target.value });
        console.log(formData2);
    }

    async function updateCustody(e) {
        try{
            const response = await axios({
              method: 'put',
              url: `${BASE_URL}/v1/phoneNo/updateCustody/${connection._id}`,
              data: {
                custody: e.value
              }
            });
              console.log(response);
              if(response.data.success) {
                  toast.success(response.data.message);
            }
            else{
              toast.warning("custody update failed! "+ response.data.message);
            }
          }catch(e){
            toast.error("Something went wrong "+e.message);
          } 
    }

    async function searchAccounts(e) {
        try {

            const timer = setTimeout(async() => {
                const response = await axios({
                    method: 'get',
                    url: `${BASE_URL}/v1/account/searchAccounts/${e.target.value}`,
                });
                console.log(response);
                for (let i = 0; i < response.data.length; i++) {
                    setOptionList(response.data);
                    console.log(optionList);
                }
            }, 1000);
            return () => clearTimeout(timer);
        }
        catch (e) {
            console.log(e);
        }
    }

    async function updateRow(e){

        try{
          const response = await axios({
            method: 'put',
            url: `${BASE_URL}/v1/phoneNo/addConnection/${connection._id}`,
            data: {
              updatedICCID: formData2?.updatedICCID,
              updatedAccountNo: formData2?.updatedAccountNo
            }
          });
            console.log(response);
            if(response.data.success) {
                toast.success(response.data.message);
            fetchMain();
          }
          else{
            toast.warning("Update failed! "+ response.data.message);
          }
        }catch(e){
          toast.error("Something went wrong "+e.message);
        } 
        
    }

    useEffect(() => {
        setConnection(Tuple);
    })

    return (
        <>
            <tr key={connection?._id}>
                <td><button onClick={() => { onOpenModal() }}><MdEdit className='h-6 w-6' /></button></td>
                <th>{connection?.phoneNo}</th>
                <td>{connection?.planType}</td>
                <td>{connection?.vendor?.vendorName}</td>
                <td>{connection?.ICCID}</td>
                <td><Select isSearchable={false} placeholder={Tuple?.custody} options={options} onChange={updateCustody}></Select></td>
                <td>{connection?.lastUser?.username}</td>
                <td>{moment(connection?.createdAt).fromNow()}</td>
            </tr>


            <Modal classNames='' open={open} onClose={onCloseModal} center>
                <h2>Assign Connection</h2>
                {
                    loading ? <p>Loading</p> :
                        <div>
                            <div className=' flex border-b-2 border-primary'>
                                <div className='p-10'>
                                    <p>Phone No: {connection?.phoneNo}</p>
                                </div>
                                <div className='p-10'>
                                    <p>Current ICCID: {connection?.ICCID}</p>
                                </div>


                            </div>
                            <div className=' flex border-b-2 border-primary'>
                                <div className='max-w-sm p-10'>
                                    <label className="form-control w-full">
                                        <div className="label">
                                            <span className="label-text">New Account Name: {formData2?.customerFName}</span>
                                        </div>
                                        <input autoComplete='off' value={formData2?.customerFName} type='text' placeholder="Type here" name='customerFName' className="input input-bordered " onChange={(e)=>{searchAccounts(e); setFormData2()}} />
                                        {
                                            optionList?.map((item)=>(
                                                <p className='border-primary border-1' onClick={()=>{setFormData2({updatedAccountNo: item?.accountNo, customerFName: item?.customerFName}); setOptionList([])}}>{item?.customerFName} : {item.accountNo}</p>
                                            ))
                                        }
                                        
                                    </label>
                                
                                    <label className="form-control w-full">
                                        <div className="label">
                                            <span className="label-text">New Account No</span>
                                        </div>
                                        <input value={formData2?.updatedAccountNo} type='text' placeholder="Type here" name='updatedAccountNo' className="input input-bordered " onChange={handleChange2} />
                                    </label>
                                </div>
                                <div className='max-w-sm p-10'>
                                    <label className="form-control w-full">
                                        <div className="label">
                                            <span className="label-text">New ICCID</span>
                                        </div>
                                        <input type='text' placeholder="Type here" name='updatedICCID' className="input input-bordered " onChange={handleChange2} />
                                    </label>
                                    <button onClick={updateRow} className='btn btn-primary mt-4'>Assign Connection</button>
                                </div>


                            </div>


                        </div>
                }
            </Modal>





        </>
    )
}

export default InventoryRow