import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './profilepage.css';
import config from '../config'

export default function UpdateSellerProfile() {
  const [sellerData, setSellerData] = useState({
    name:'',
    email:'',
    gender:'',
    dateofbirth:'',
    contact:'',
    companyname:'',
    location:'',
    password: ''
  });

  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const [initialSellerData, setInitialSellerData] = useState({});

  useEffect(() => {
    const storedSellerData = localStorage.getItem('seller');
    if (storedSellerData) {
      const parsedSellerData = JSON.parse(storedSellerData);
      setSellerData(parsedSellerData);
      setInitialSellerData(parsedSellerData); 
    }
  }, []);

  const handleChange = (e) => {
    setSellerData({ ...sellerData, [e.target.id]: e.target.value });
  };

  const handleSubmit = async (e) => 
  {
    e.preventDefault();
    try 
    {
      const updatedData = {};
      for (const key in sellerData) {
        if (sellerData[key] !== initialSellerData[key] && initialSellerData[key] !== '') {
          updatedData[key] = sellerData[key]; 
        }
      }
      if (Object.keys(updatedData).length !== 0) {
        // There are changes
        updatedData.email = sellerData.email;
        const response = await axios.put(`${config.url}/updatesellerprofile`, updatedData);
        setMessage(response.data);
        setError('');
        const res = await axios.get(`${config.url}/sellerprofile/${sellerData.email}`, updatedData)
        localStorage.setItem("seller",JSON.stringify(res.data))
      } else {
        // No changes
        setMessage("No Changes in Seller Profile");
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
            <input type="text" id="name" value={sellerData.name} onChange={handleChange} required />
              </td>
        </tr>
        <tr>
            <td>Email</td>
            <td><input type="email" id="email" value={sellerData.email} readOnly /></td>
        </tr>
        <tr>
            <td>Gender</td>
            
            <td><input type="text" id="gender" value={sellerData.gender} readOnly /></td>
        </tr>
        <tr>
            <td>Date of Birth</td>
            <td><input type="date" id="dateofbirth" value={sellerData.dateofbirth} onChange={handleChange} required /></td>
        </tr>
        <tr>
            <td>Contact</td>
            <td><input type="number" id="contact" value={sellerData.contact} onChange={handleChange} required /></td>
        </tr>

        <tr>
            <td>Company Name</td>
            <td><input type="text" id="companyname" value={sellerData.companyname} onChange={handleChange} required /></td>
        </tr>

        <tr>
            <td>Location</td>
            <td><input type="text" id="location" value={sellerData.location} onChange={handleChange} required /></td>
        </tr>
        <tr>
            <td>Password</td>
            <td><input type="password" id="password" value={sellerData.password} onChange={handleChange} required /></td>
        </tr>
    </table>
    <button type="submit">Update</button>
    </form>
</div>
</div>


  );
}