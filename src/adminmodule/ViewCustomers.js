import React, { useState, useEffect } from 'react';
import axios from 'axios';
import config from '../config'


export default function ViewCustomers() {
  const [customers, setCustomers] = useState([]);

  const fetchCustomers = async () => {
    try {
      const response = await axios.get(`${config.url}/viewcustomers`);
      setCustomers(response.data);
    } catch (error) {
      console.error(error.message);
    }
  }

  useEffect(() => {
    fetchCustomers();
  }, []);

  const deleteCustomer = async (email) => {
    try {
      await axios.delete(`${config.url}/deletecustomer/${email}`);
      fetchCustomers();
    } catch (error) {
      console.error(error.message);
    }
  }

  return (
    <div style={{ textAlign: 'center' }}>
      <h1>Customers</h1>
      
      <table border={1} align="center" style={{ width: 'auto', height: 'auto' }}>
          <thead>
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>Gender</th>
              <th>D.O.B</th>
              <th>Contact</th>
              <th>Location</th>
              <th>Operation</th>
            </tr>
          </thead>
          <tbody>
  {Array.isArray(customers) && customers.length > 0 ? (
    customers.map((customer, index) => (
      <tr key={index}>
        <td>{customer.name}</td>
        <td>{customer.email}</td>
        <td>{customer.gender}</td>
        <td>{customer.dateofbirth}</td>
        <td>{customer.contact}</td>
        <td>{customer.location}</td>
        <td>
          <button onClick={() => deleteCustomer(customer.email)} className='button'>Delete</button>
        </td>
      </tr>
    ))
  ) : (
    <tr>
      <td colSpan="7">Data Not Found</td>
    </tr>
  )}
</tbody>
        </table>
    </div>
  );
}