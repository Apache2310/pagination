import React, { useState, useEffect } from 'react';
import axios from 'axios';
import  './App.css';

const Pagination = () => {
  const [employees, setEmployees] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await axios.get('https://geektrust.s3-ap-southeast-1.amazonaws.com/adminui-problem/members.json');
      setEmployees(response.data);
    } catch (error) {
      alert('Failed to fetch data');
    }
  };

  const nextPage = () => {
    setCurrentPage(prevPage => Math.min(prevPage + 1, Math.ceil(employees.length / 10)));
  };

  const prevPage = () => {
    setCurrentPage(prevPage => Math.max(prevPage - 1, 1));
  };

  const startIndex = (currentPage - 1) * 10;
  const endIndex = Math.min(startIndex + 10, employees.length);

  return (
    <div className='container'>
      <h1>Employee Data Table</h1>
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Email</th>
            <th>Role</th>
          </tr>
        </thead>
        <tbody>
          {employees.slice(startIndex, endIndex).map(employee => (
            <tr key={employee.id}>
              <td>{employee.id}</td>
              <td>{employee.name}</td>
              <td>{employee.email}</td>
              <td>{employee.role}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <div>
        <button onClick={prevPage} disabled={currentPage === 1}>Previous</button>
        <span>{currentPage}</span>
        <button onClick={nextPage} disabled={currentPage === Math.ceil(employees.length / 10)}>Next</button>
      </div>
    </div>
  );
};

export default Pagination;
