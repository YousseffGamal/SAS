import React, { useEffect, useState } from "react";
import Sidebar from "../../Components/SIdebar/Sidebar";
import "./EmployeesRecords.css";
import api from "../../axios";
const UsersRecords = () => {
  const [users, setUsers] = useState([]);
  useEffect(() => {
    const records = async () => {
      try {
        const res = await api.get("/users/get_all_users");
        console.log(res.data);
        setUsers(res.data);
      } catch (error) {
        console.log(error);
      }
    };
    records();
  }, []);

  return (
    <div className="home-container">
      <Sidebar />
      <div className="content">
        <h1 className="head">All users</h1>
        <div className="table-responsive bv">
          <table className="table ">
            <thead>
              <tr>
                <th>Username</th>
                <th>Email</th>
                <th>User type</th>
              </tr>
            </thead>
            <tbody>
              {users &&
                users?.map((record) => {
                  return (
                    <tr>
                      <td>{record?.username}</td>
                      <td>{record?.email}</td>
                      <td>{record?.user_type}</td>
                    </tr>
                  );
                })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default UsersRecords;
