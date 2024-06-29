import React, { useEffect, useState } from 'react';
import Sidebar from '../../Components/SIdebar/Sidebar';
import './EmployeesRecords.css';
import { Link } from 'react-router-dom';
import arrow from '../../Images/shortcut.png'
import api from "../../axios";
const EmployeesRecords = () => {
const [records , setRecords]=useState([])
  useEffect(() => {
    const records = async () => {
      try {
        const res = await api.get('/attendance/get_attendance')
        console.log(res.data);
        setRecords(res.data)
      } catch (error) {
        console.log(error);
      }
    }
    records()
  },[])

  return (
    <div className="home-container">
      <Sidebar />
      <div className="content">
        <h1 className='head'>Employee Records</h1>
        <div className="table-responsive bv">
          <table  className="table ">
            <thead>
              <tr>
                <th>Name</th>
                <th>Hours</th>
                <th style={{textAlign:"center"}}>From:To</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {records && records?.map((record) => {
                return (
                  <tr>
                    <td>{record?.employee_name}</td>
                    <td className='gre'>{(record?.duration / 3600).toFixed(2)}</td>
                    <td style={{textAlign:"center"}}>{new Date(record?.check_in_time).toLocaleTimeString()} - {new Date(record?.check_out_time).toLocaleTimeString()}</td>
                    <td> <img style={{float:"right"}} src={arrow} alt="" /></td>
                  </tr>
                )
              })}
            </tbody>
          </table>
        
        </div>
      </div>
    </div>
  );
};

export default EmployeesRecords;
