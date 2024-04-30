import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate,useLocation } from 'react-router-dom';
import './recommendpage.css'
import config from '../config'




export default function Recommend() {
    const location = useLocation()
    const pnmae = location.state.param1;
    const email=location.state.param2;
  
    
  const [formData, setFormData] = useState({
    productname: pnmae,
    fromemail: email,
    toemail:'',
    text: '',
  });
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { id, value } = e.target; 
    setFormData({ ...formData, [id]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
        console.log(formData)
      const response = await axios.post(`${config.url}/recommendproduct`, formData);
      if (response.data != null) {
        console.log(response.data); 

        // Display success message using an alert (modify for a more user-friendly popup)
        alert("Recommendation successful!");
        setMessage('')
      } else {
        setMessage("Login Failed");
        setError("");
      }
    } catch (error) {
      setMessage("");
      setError(error.message);
    }
  };

  return (
    <div className="co" align='center'> {/* Use styles from Recomand.css */}
      <h3><u>RECOMMEND FORM</u></h3><br></br>
      {message ? <p className="message" style={{ color: 'red' }}>{message}</p> : <p className="error" style={{ color: 'blue' }}>{error}</p>}
      <form onSubmit={handleSubmit}>
        <table >

        <tr>
          <td><label>Product Name</label></td>&nbsp;&nbsp;
          <td><input type="text" id="productname" value={pnmae} readOnly /></td>
        </tr><br></br>
       
        <tr>
          <td><label>To Email</label></td>&nbsp;&nbsp;
          <td><input type="email" id="toemail" value={formData.toemail} onChange={handleChange} required /></td>
        </tr><br></br>

        <tr>
        <td><label>Product Description</label></td>&nbsp;&nbsp;
        <td><input type="text" id="text" value={formData.text} onChange={handleChange} required /></td>
        </tr><br></br>
        
        </table>
        <button type="submit" align='center'>Recommend</button>
      </form>
    </div>
  );  
}