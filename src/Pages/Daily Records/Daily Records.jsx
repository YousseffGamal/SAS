import React, { useEffect, useState } from 'react';
import Sidebar from '../../Components/SIdebar/Sidebar';
import './Daily Records.css';
import { useParams } from 'react-router-dom';
import api from '../../axios';
const EmployeeDailyRecords = () => {
  const { employee_id } = useParams();
  const [details , setDetails]=useState([])
  useEffect(() => {
    const records = async () => {
      try {
        const res = await api.get(`/attendance/get_attendance_by_employee?employee_id=${employee_id}`);
        console.log(res.data);
        setDetails(res.data);
      } catch (error) {
        console.log(error);
      }
    };
    records();
  
  },[])
  return (
    <div className="home-container">
      <Sidebar />
      <div className="content">
        <h1 className='head'>Daily Records </h1>
        <div className="table-responsive bv">
          <table  className="table  ">
            <thead>
              <tr>
                <th>Day</th>
                <th>Hours</th>
                <th style={{textAlign:"center"}}>From:To</th>
              </tr>
            </thead>
            <tbody>
              {
                details && details?.map((record) => {
                  return (
                    <tr>
                      <td>{new Date(record?.check_in_time).toDateString().split(' ').slice(0, 3).join(', ')}</td>
                      <td className='gre'>{(record?.duration / 3600).toFixed(2)}</td>
                      <td style={{textAlign:"center"}}>{new Date(record?.check_in_time).toLocaleTimeString()} - {new Date(record?.check_out_time).toLocaleTimeString()}</td>
                    </tr>
                  );
                })
              }
            </tbody>
          </table>
  

        </div>
        {/* <div style={{display:"flex",justifyContent:"center",gap:"50px",marginTop:"40px"}} className='rem'> */}
     {/* <button type="button" class="btn btn-primary">Check Status</button>
     <button type="button" class="btn btn-danger">Delete Employee</button> */}

     {/* </div> */}
      </div>
    </div>
  );
};

export default EmployeeDailyRecords;
