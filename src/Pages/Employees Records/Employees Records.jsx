import React from 'react';
import Sidebar from '../../Components/SIdebar/Sidebar';
import './EmployeesRecords.css';
import arrow from '../../Images/shortcut.png'
const EmployeesRecords = () => {
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
              <tr>
                <td>John Doe</td>
                <td className='gre'>40</td>
                <td style={{textAlign:"center"}}>9:00 AM - 5:00 PM</td>
                <td> <img style={{float:"right"}} src={arrow} alt="" /></td>

              </tr>
              <tr>
                <td>Jane Smith</td>
                <td className='gre'>35</td>
                <td style={{textAlign:"center"}}>10:00 AM - 6:00 PM</td>
                <td> <img style={{float:"right"}} src={arrow} alt="" /></td>

              </tr>
              <tr>
                <td>Michael Johnson</td>
                <td className='gre'>38</td>
                <td style={{textAlign:"center"}}>8:30 AM - 4:30 PM</td>
                <td> <img style={{float:"right"}} src={arrow} alt="" /></td>

              </tr>
              <tr>
                <td>Sarah Brown</td>
                <td className='gre'>37</td>
                <td style={{textAlign:"center"}}>9:30 AM - 5:30 PM</td>
                <td> <img style={{float:"right"}} src={arrow} alt="" /></td>

              </tr>
              <tr>
                <td>Chris Lee</td>
                <td className='gre'>42</td>
                <td style={{textAlign:"center"}}>9:00 AM - 5:00 PM</td>
                <td> <img style={{float:"right"}} src={arrow} alt="" /></td>

              </tr>
              <tr>
                <td>Amy Wang</td>
                <td className='gre'>36</td>
                <td style={{textAlign:"center"}}>10:30 AM - 6:30 PM</td>
                <td> <img style={{float:"right"}} src={arrow} alt="" /></td>

              </tr>
              <tr>
                <td>David Miller</td>
                <td className='gre'>39</td>
                <td style={{textAlign:"center"}}>7:00 AM - 3:00 PM</td>
                <td> <img style={{float:"right"}} src={arrow} alt="" /></td>

              </tr>
              <tr>
                <td>Emily Davis</td>
                <td className='gre'>34</td>
                <td style={{textAlign:"center"}}>11:00 AM - 7:00 PM</td>
                <td> <img style={{float:"right"}} src={arrow} alt="" /></td>

              </tr>
       
              {/* Add more rows as needed */}
            </tbody>
          </table>
        
        </div>
      </div>
    </div>
  );
};

export default EmployeesRecords;
