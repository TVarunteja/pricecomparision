import React, { useEffect, useState } from 'react';
import './profilepage.css'
import { useNavigate  } from 'react-router-dom';
export default function ViewCustomerProfile() {

  const [customerData, setCustomerData] = useState([]);

  useEffect(() => {
    const storedCustomerData = localStorage.getItem('customer');
    if (storedCustomerData) {
      const parsedCustomerData = JSON.parse(storedCustomerData);
      setCustomerData(parsedCustomerData)
    }
  }, []);

  const navigate = useNavigate();

  return (

    customerData ? (
        <div class="con">
    <h2>Your Profile</h2>
    <table>
        <tr>
            <td>Full Name</td>
            <td>
              {customerData.name}
              </td>
        </tr>
        <tr>
            <td>Email</td>
            <td>{customerData.email}</td>
        </tr>
        <tr>
            <td>Gender</td>
            <td>{customerData.gender}</td>
        </tr>
        <tr>
            <td>Date of Birth</td>
            <td>{customerData.dateofbirth}</td>
        </tr>
        <tr>
            <td>Contact</td>
            <td>{customerData.contact}</td>
        </tr>
        <tr>
            <td>Location</td>
            <td>{customerData.location}</td>
        </tr>
     
    </table>
    <div class="link" onClick={()=>{navigate('/updatecustomerprofile')}}> Update?</div>
    
</div>
      ) : (
        <p>No Customer Data Found</p>
      )
    );
}
