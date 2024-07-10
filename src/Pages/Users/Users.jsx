import React, { useEffect, useState } from "react";
import Sidebar from "../../Components/SIdebar/Sidebar";
import "./Users.css";
import api from "../../axios";
import { FaTrashAlt } from "react-icons/fa";

const UsersRecords = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const res = await api.get("/users/get_all_users");
        setUsers(res.data);
      } catch (error) {
        console.log("Error fetching users:", error);
      }
    };
    fetchUsers();
  }, []);

  const handleDeleteUser = async (userId) => {
    const isConfirmed = window.confirm("Are you sure you want to delete this user?");
    if (!isConfirmed) {
      return;
    }
    try {
      await api.delete(`/users/delete_user/${userId}`);
      // Update users state after deletion
      setUsers(users.filter(user => user._id !== userId));
      window.alert(`User deleted successfully.`);
    } catch (error) {
      window.alert(`Error deleting user with ID ${userId}: ${error}`);
    }
  };

  return (
    <div className="home-container">
      <Sidebar />
      <div className="content">
        <h1 className="head">All users</h1>
        <div className="table-responsive bv">
          <table className="table">
            <thead>
              <tr>
                <th>Username</th>
                <th>Email</th>
                <th>User type</th>
                <th style={{textAlign:'center'}}>Action</th>
              </tr>
            </thead>
            <tbody>
              {users.map((user) => (
                <tr key={user._id}>
                  <td>{user.username}</td>
                  <td>{user.email}</td>
                  <td>{user.user_type}</td>
                  <td style={{textAlign:'center'}}>
                    <button
                      className="delete-btn"
                      onClick={() => handleDeleteUser(user._id)}
                    >
                      <FaTrashAlt /> Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default UsersRecords;
