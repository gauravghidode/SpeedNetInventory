import React, { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { toast } from 'react-toastify'
import axios from 'axios'
import { useState } from 'react'
import Select from 'react-select';
import { useSelector } from 'react-redux'
import DatePicker from 'react-datepicker'
import * as xlsx from 'xlsx';
import { useParams } from 'react-router-dom'
const BASE_URL = import.meta.env.VITE_REACT_APP_BASE_URL;


const ExcelToJson = () => {

    const [data, setData] = useState([]);

    async function addEntry() {
        try {
            console.log(data);
            for (let i = 0; i < data.length; i++) {
                let formData = data[i];
                console.log(formData);
                const response = await axios({
                    method: 'post',
                    url: `${BASE_URL}/v1/phoneNo/add`,
                    data: formData
                });
                console.log(response);
                if (response.data.success) {
                    toast.success(response.data.message);
                } else {
                    toast.warning(response.data.message);
                }
            }
        }
        catch (e) {
            toast.error("Something went wrong " + e.message);
        }
    }

    const readUploadFile = (e) => {
        e.preventDefault();
        if (e.target.files) {
            const reader = new FileReader();
            reader.onload = (e) => {
                const data = e.target.result;
                const workbook = xlsx.read(data, { type: "array" });
                const sheetName = workbook.SheetNames[0];
                const worksheet = workbook.Sheets[sheetName];
                const json = xlsx.utils.sheet_to_json(worksheet);
                // console.log(json);
                setData(json);
            };
            reader.readAsArrayBuffer(e.target.files[0]);
        }
    }

    return (
        <div>
            <input
                type="file"
                name="upload"
                id="upload"
                onChange={readUploadFile}
            />
            <button onClick={addEntry}>click</button>
        </div>
    )
}

export default ExcelToJson