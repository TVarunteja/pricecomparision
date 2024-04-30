import React, { useState, useEffect } from 'react';
import axios from 'axios';
import config from '../config'

export default function ViewSellers() {
  const [sellers, setSellers] = useState([]);

  const fetchSellers = async () => {
    try {
      const response = await axios.get(`${config.url}/viewsellers`);
      setSellers(response.data);
    } catch (error) {
      console.error(error.message);
    }
  }

  useEffect(() => {
    fetchSellers();
  }, []);

  const deleteSeller = async (email) => {
    if (window.confirm("Are you sure want to delete this Seller?")) {
      try {
        await axios.delete(`${config.url}/deleteseller/${email}`);
        fetchSellers();
      } catch (error) {
        console.error(error.message);
      }
    } else {
      fetchSellers();
    }
  }

  return (
    <div style={{ textAlign: 'center' }}>
      <h1>Sellers</h1>
      <table border={1} align="center" style={{ width: 'auto', height: 'auto' }}>
        <thead>
          <tr>
            <th>Full Name</th>
            <th>Email</th>
            <th>Gender</th>
            <th>D.O.B</th>
            <th>Contact</th>
            <th>Company Name</th>
            <th>Location</th>
            <th>Operation</th>
          </tr>
        </thead>
        <tbody>
          {Array.isArray(sellers) && sellers.length > 0 ? (
            sellers.map((seller, index) => (
              <tr key={index}>
                <td>{seller.name}</td>
                <td>{seller.email}</td>
                <td>{seller.gender}</td>
                <td>{seller.dateofbirth}</td>
                <td>{seller.contact}</td>
                <td>{seller.companyname}</td>
                <td>{seller.location}</td>
                <td>
                  <button onClick={() => deleteSeller(seller.email)} className='button'>Delete</button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="9" align='center'>Data Not Found</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}