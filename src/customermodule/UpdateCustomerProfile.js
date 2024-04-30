import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './profilepage.css';
import config from '../config'
export default function UpdateCustomerProfile() {
  const [customerData, setCustomerData] = useState({
    name:'',
    email:'',
    gender:'',
    dateofbirth:'',
    contact:'',
    location:'',
    password: ''
  });

  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const [initialCustomerData, setInitialCustomerData] = useState({});

  useEffect(() => {
    const storedCustomerData = localStorage.getItem('customer');
    if (storedCustomerData) {
      const parsedCustomerData = JSON.parse(storedCustomerData);
      setCustomerData(parsedCustomerData);
      setInitialCustomerData(parsedCustomerData); 
    }
  }, []);

  const handleChange = (e) => {
    setCustomerData({ ...customerData, [e.target.id]: e.target.value });
  };

  const handleSubmit = async (e) => 
  {
    e.preventDefault();
    try 
    {
      const updatedData = {};
      for (const key in customerData) {
        if (customerData[key] !== initialCustomerData[key] && initialCustomerData[key] !== '') {
          updatedData[key] = customerData[key]; 
        }
      }
      if (Object.keys(updatedData).length !== 0) {
        // There are changes
        updatedData.email = customerData.email;
        const response = await axios.put(`${config.url}/updatecustomerprofile`, updatedData);
        setMessage(response.data);
        setError('');
        const res = await axios.get(`${config.url}/customerprofile/${customerData.email}`, updatedData)
        localStorage.setItem("customer",JSON.stringify(res.data))
      } else {
        // No changes
        setMessage("No Changes in Customer Profile");
        setError("");
      }
    } 
    catch (error) {
      setError(error.response.data);
      setMessage('');
    }
  };
  
  
  return (
    <div>
      {message ? <h4 align="center">{message}</h4> : <h4 align="center" color='red'>{error}</h4>}
      <div class="con">
      <form onSubmit={handleSubmit}>
    <h2>Update Profile</h2>
    <table>
        <tr>
            <td>Full Name</td>
            <td>
            <input type="text" id="name" value={customerData.name} onChange={handleChange} required />
              </td>
        </tr>
        <tr>
            <td>Email</td>
            <td><input type="email" id="email" value={customerData.email} readOnly /></td>
        </tr>
        <tr>
            <td>Gender</td>
            
            <td><input type="text" id="gender" value={customerData.gender} readOnly /></td>
        </tr>
        <tr>
            <td>Date of Birth</td>
            <td><input type="date" id="dateofbirth" value={customerData.dateofbirth} onChange={handleChange} required /></td>
        </tr>
        <tr>
            <td>Contact</td>
            <td><input type="number" id="contact" value={customerData.contact} onChange={handleChange} required /></td>
        </tr>
        <tr>
            <td>Location</td>
            <td><input type="text" id="location" value={customerData.location} onChange={handleChange} required /></td>
        </tr>
        <tr>
            <td>Password</td>
            <td><input type="password" id="password" value={customerData.password} onChange={handleChange} required /></td>
        </tr>
    </table>
    <button type="submit">Update</button>
    </form>
</div>
</div>


  );
}