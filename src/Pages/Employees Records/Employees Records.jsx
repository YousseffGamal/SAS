import React, { useEffect, useState } from "react";
import Sidebar from "../../Components/SIdebar/Sidebar";
import "./EmployeesRecords.css";
import { Link } from "react-router-dom";
import arrow from "../../Images/shortcut.png";
import api from "../../axios";
import { jsPDF } from "jspdf";
import "jspdf-autotable";

const EmployeesRecords = () => {
  const [records, setRecords] = useState([]);
  const [selectedRecords, setSelectedRecords] = useState([]);
  const [selectAll, setSelectAll] = useState(false);

  useEffect(() => {
    const fetchRecords = async () => {
      try {
        const res = await api.get("/attendance/get_attendance");
        setRecords(res.data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchRecords();
  }, []);

  const handleExportPDF = () => {
    const doc = new jsPDF();
    doc.autoTable({
      head: [["Name", "Hours", "From:To"]],
      body: selectedRecords.map((record) => [
        record.employee_name,
        (record.duration / 3600).toFixed(2),
        `${new Date(record.check_in_time).toLocaleTimeString()} - ${new Date(
          record.check_out_time
        ).toLocaleTimeString()}`,
      ]),
    });
    doc.save("employees_records.pdf");
  };

  const handleRecordSelection = (record, checked) => {
    if (checked) {
      setSelectedRecords([...selectedRecords, record]);
    } else {
      setSelectedRecords(selectedRecords.filter((r) => r !== record));
    }
  };

  const handleSelectAll = () => {
    if (selectAll) {
      setSelectedRecords([]);
    } else {
      setSelectedRecords([...records]);
    }
    setSelectAll(!selectAll);
  };

  return (
    <div className="home-container">
      <Sidebar />
      <div className="content">
        <h1 className="head">Employee Records</h1>
        <div className="table-responsive bv">
          <table className="table">
            <thead>
              <tr>
                <th>Name</th>
                <th>Hours</th>
                <th style={{ textAlign: "center" }}>From:To</th>
                <th>Details</th>
                <th style={{textAlign:"center"}}>
                  Select All <br />
                  <input
                    type="checkbox"
                    checked={selectAll}
                    onChange={handleSelectAll}
                  />
                </th>
              </tr>
            </thead>
            <tbody>
              {records.map((record) => (
                <tr key={record.employee_id}>
                  <td>{record.employee_name}</td>
                  <td className="gre">{(record.duration / 3600).toFixed(2)}</td>
                  <td style={{ textAlign: "center" }}>
                    {new Date(record.check_in_time).toLocaleTimeString()} -{" "}
                    {new Date(record.check_out_time).toLocaleTimeString()}
                  </td>
                  <td>
                    <Link to={`/employee-details/${record.employee_id}`}>
                      <img src={arrow} alt="Details" />
                    </Link>
                  </td>
                  <td style={{textAlign:"center"}}>
                    <input
                      type="checkbox"
                      onChange={(e) => handleRecordSelection(record, e.target.checked)}
                      checked={selectedRecords.some((r) => r === record)}
                    />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div style={{ display: "flex", justifyContent: "center" }}>
            <button class="btn btn-info" onClick={handleExportPDF}>PDF</button>
            </div>
      </div>
    </div>
  );
};

export default EmployeesRecords;
