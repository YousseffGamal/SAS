import React, { useEffect, useState } from "react";
import Sidebar from "../../Components/SIdebar/Sidebar";
import "./EmployeesRecords.css";
import { Link } from "react-router-dom";
import arrow from "../../Images/shortcut.png";
import api from "../../axios";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import Select from "react-select";
import * as XLSX from "xlsx";

const monthOptions = [
  { value: 0, label: "January" },
  { value: 1, label: "February" },
  { value: 2, label: "March" },
  { value: 3, label: "April" },
  { value: 4, label: "May" },
  { value: 5, label: "June" },
  { value: 6, label: "July" },
  { value: 7, label: "August" },
  { value: 8, label: "September" },
  { value: 9, label: "October" },
  { value: 10, label: "November" },
  { value: 11, label: "December" },
];

const monthNames = [
  "January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December"
];

const EmployeesRecords = () => {
  const [records, setRecords] = useState([]);
  const [filteredRecords, setFilteredRecords] = useState([]);
  const [selectedRecords, setSelectedRecords] = useState([]);
  const [selectAll, setSelectAll] = useState(false);
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedMonths, setSelectedMonths] = useState([]);
  const [employeeName, setEmployeeName] = useState(""); // New state for employee name filter

  useEffect(() => {
    const fetchRecords = async () => {
      try {
        const res = await api.get("/attendance/get_attendance");
        setRecords(res.data);
        setFilteredRecords(res.data); // Initially display all records
      } catch (error) {
        console.log(error);
      }
    };
    fetchRecords();
  }, []);

  const filterRecords = (records, date, months, name) => {
    if (!date && months.length === 0 && !name) {
      setFilteredRecords(records);
      return;
    }

    const day = date ? date.getDate() : null;
    const monthValues = months.map((month) => month.value);

    const filtered = records.filter(record => {
      const checkInDate = new Date(record.check_in_time);
      const isMonthMatch = monthValues.length > 0 ? monthValues.includes(checkInDate.getMonth()) : true;
      const isDayMatch = date ? checkInDate.getDate() === day && checkInDate.getFullYear() === date.getFullYear() : true;
      const isNameMatch = name ? record.employee_name.toLowerCase().includes(name.toLowerCase()) : true;

      return isMonthMatch && isDayMatch && isNameMatch;
    });

    setFilteredRecords(filtered);
  };

  const handleDateChange = (date) => {
    setSelectedDate(date);
    filterRecords(records, date, selectedMonths, employeeName);
  };

  const handleMonthChange = (months) => {
    setSelectedMonths(months);
    filterRecords(records, selectedDate, months, employeeName);
  };

  const handleNameChange = (event) => {
    const name = event.target.value;
    setEmployeeName(name);
    filterRecords(records, selectedDate, selectedMonths, name);
  };

  const clearFilter = () => {
    setSelectedDate(null);
    setSelectedMonths([]);
    setEmployeeName("");
    setFilteredRecords(records);
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
      setSelectedRecords([...filteredRecords]);
    }
    setSelectAll(!selectAll);
  };

  const handleExportExcel = () => {
    // Sort selectedRecords by check_in_time
    const sortedRecords = selectedRecords.slice().sort((a, b) => new Date(a.check_in_time) - new Date(b.check_in_time));
  
    const worksheet = XLSX.utils.json_to_sheet(
      sortedRecords.map((record) => ({
        Name: record.employee_name,
        Hours: (record.duration / 3600).toFixed(2),
        Month: monthNames[new Date(record.check_in_time).getUTCMonth()],
        Day: new Date(record.check_in_time).getUTCDate(),
        From: new Date(record.check_in_time).toLocaleTimeString(),
        To: new Date(record.check_out_time).toLocaleTimeString(),
        'Location name': record.location_name
      }))
    );
  
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Employee Records");
    XLSX.writeFile(workbook, "employees_records.xlsx");
  };

  return (
    <div className="home-container">
      <Sidebar />
      <div className="content">
        <h1 className="head">Employee Records</h1>
        <div className="filter-container">
          <label>Select Date: </label>
          <DatePicker
            selected={selectedDate}
            onChange={handleDateChange}
            dateFormat="dd/MM/yyyy"
            isClearable
            placeholderText="Select a date"
          />
          <label>Select Months: </label>
          <Select
            isMulti
            options={monthOptions}
            value={selectedMonths}
            onChange={handleMonthChange}
            placeholder="Select months"
          />
          <label>Employee Name: </label>
          <input
            type="text"
            value={employeeName}
            onChange={handleNameChange}
            placeholder="Filter by employee name"
          />
          <button className="btn btn-secondary" onClick={clearFilter}>Clear Filter</button>
        </div>
        <div className="table-responsive bv">
          <table className="table">
            <thead>
              <tr>
                <th style={{ textAlign: "center" }}>
                  <input
                    type="checkbox"
                    checked={selectAll}
                    onChange={handleSelectAll}
                  />
                </th>
                <th>Name</th>
                <th>Hours</th>
                <th style={{ textAlign: "center" }}>From - To</th>
                <th>Location name</th>
                <th>Details</th>
              </tr>
            </thead>
            <tbody>
              {filteredRecords?.map((record) => (
                <tr key={record.check_out_time}>
                  <td style={{ textAlign: "center" }}>
                    <input
                      type="checkbox"
                      onChange={(e) => handleRecordSelection(record, e.target.checked)}
                      checked={selectedRecords.some((r) => r === record)}
                    />
                  </td>
                  <td>{record.employee_name}</td>
                  <td className="gre">{(record.duration / 3600).toFixed(2)}</td>
                  <td style={{ textAlign: "center" }}>
                    {new Date(record.check_in_time).toLocaleTimeString()} -{" "}
                    {new Date(record.check_out_time).toLocaleTimeString()}
                  </td>
                  <td>{record.location_name}</td>
                  <td>
                    <Link to={`/employee-details/${record.employee_id}`}>
                      <img src={arrow} alt="Details" />
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div style={{ display: "flex", justifyContent: "center" }}>
          <button className="btn btn-info" onClick={handleExportExcel}>Excel</button>
        </div>
      </div>
    </div>
  );
};

export default EmployeesRecords;
