import React, { useEffect, useState } from 'react';
import './profilepage.css'
import config from '../config'

import { useNavigate  } from 'react-router-dom';
export default function ViewCustomerProfile() {

  const [sellerData, setSellerData] = useState([]);

  useEffect(() => {
    const storedSellerData = localStorage.getItem('seller');
    if (storedSellerData) {
      const parsedSellerData = JSON.parse(storedSellerData);
      setSellerData(parsedSellerData)
    }
  }, []);

  const navigate = useNavigate();

  return (

    sellerData ? (
        <div class="con">
    <h2>Your Profile</h2>
    <table>
        <tr>
            <td>Full Name</td>
            <td>
              {sellerData.name}
              </td>
        </tr>
        <tr>
            <td>Email</td>
            <td>{sellerData.email}</td>
        </tr>
        <tr>
            <td>Gender</td>
            <td>{sellerData.gender}</td>
        </tr>
        <tr>
            <td>Date of Birth</td>
            <td>{sellerData.dateofbirth}</td>
        </tr>
        <tr>
            <td>Contact</td>
            <td>{sellerData.contact}</td>
        </tr>
        <tr>
            <td>Company Name</td>
            <td>{sellerData.companyname}</td>
        </tr>
        <tr>
            <td>Location</td>
            <td>{sellerData.location}</td>
        </tr>
     
    </table>
    <div class="link" onClick={()=>{navigate('/updatesellerprofile')}}> Update?</div>
    
</div>
      ) : (
        <p>No Customer Data Found</p>
      )
    );
}
