import React from 'react';
import Sidebar from '../../Components/SIdebar/Sidebar';
import './Frank’s Daily Records.css';
const FrankDailyRecords = () => {
  return (
    <div className="home-container">
      <Sidebar />
      <div className="content">
        <h1 className='head'>Frank’s Daily Records </h1>
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
              <tr>
                <td>Wed, 1/5</td>
                <td className='gre'>40</td>
                <td style={{textAlign:"center"}}>9:00 AM - 5:00 PM</td>
                

              </tr>
              <tr>
                <td>Wed, 1/5</td>
                <td className='gre'>35</td>
                <td style={{textAlign:"center"}}>10:00 AM - 6:00 PM</td>
                

              </tr>
              <tr>
                <td>Wed, 1/5</td>
                <td className='gre'>38</td>
                <td style={{textAlign:"center"}}>8:30 AM - 4:30 PM</td>
                

              </tr>
              <tr>
                <td>Wed, 1/5</td>
                <td className='gre'>37</td>
                <td style={{textAlign:"center"}}>9:30 AM - 5:30 PM</td>
                

              </tr>
              <tr>
                <td>Wed, 1/5</td>
                <td className='gre'>42</td>
                <td style={{textAlign:"center"}}>9:00 AM - 5:00 PM</td>
                

              </tr>
              <tr>
                <td>Wed, 1/5</td>
                <td className='gre'>36</td>
                <td style={{textAlign:"center"}}>10:30 AM - 6:30 PM</td>
                

              </tr>
              <tr>
                <td>Wed, 1/5</td>
                <td className='gre'>39</td>
                <td style={{textAlign:"center"}}>7:00 AM - 3:00 PM</td>
                

              </tr>
              <tr>
                <td>Wed, 1/5</td>
                <td className='gre'>34</td>
                <td style={{textAlign:"center"}}>11:00 AM - 7:00 PM</td>
                

              </tr>
       
              {/* Add more rows as needed */}


            </tbody>
          </table>
  

        </div>
        <div style={{display:"flex",justifyContent:"center",gap:"50px",marginTop:"40px"}} className='rem'>
     <button type="button" class="btn btn-primary">Check Status</button>
     <button type="button" class="btn btn-danger">Delete Employee</button>

     </div>
      </div>
    </div>
  );
};

export default FrankDailyRecords;
