import React, { useState, useEffect,useRef } from 'react';
import axios from 'axios';
import { useLocation ,useNavigate  } from 'react-router-dom';
import './StyleSheet.css'
import config from '../config'


export default function UpdateProductDetails() {

  const location = useLocation()
  const pid = location.state;
  const [productData, setProductData] = useState({
        companyname: '',
        productname:'',
        category: '',
        description:'',
        prevprice:'',
        newprice:'',
        seller:'',
        file:null,
        productid:pid
  });

  const fileInputRef = useRef(null); 
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const [initialProductData, setInitialProductData] = useState({});



  const fetchproductdetails = async () => {
    try 
    {
      const response = await axios.get(`${config.url}/getproductdetails/${pid}`);
      console.log(response.data)

      setProductData(response.data[0])
      console.log(productData+"[[[[[[[[[[")
      setInitialProductData(response.data)
    }
    catch (error) 
    {
      setError(error.response.data);
      console.log(error)
    }
  };


  useEffect(() => {
    fetchproductdetails();
  }, []);

  const handleChange = (e) => {
    setProductData({ ...productData, [e.target.id]: e.target.value });
  };

  const handleFileChange = (e) => {
    setProductData({ ...productData, file: e.target.files[0] });
  };

  const handleSubmit = async (e) => 
  {
    e.preventDefault();
    try 
    {
      const updatedData = {};
      for (const key in productData) {
        if (productData[key] !== initialProductData[key] && initialProductData[key] !== '') {
          updatedData[key] = productData[key];
        }
      }
      if (Object.keys(updatedData).length !== 0) {
 
        const response = await axios.put(`${config.url}/updateproductdetails`, updatedData);
        setMessage(response.data);
        setError('');
 
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
    <div align="center">
      {message ? <h4 align="center">{message}</h4> : null}
      {error ? <h4 align="center" style={{ color: 'red' }}>{error}</h4> : null}
    
          <div class="container" >
          <form onSubmit={handleSubmit} encType="multipart/form-data" >
        <h2>Sell Product</h2>
        <div class="content">
        <div class="input-box">


        <label >Product Name</label>
        <input type="text" id="productname" value={productData.productname} onChange={handleChange} required/>

        <label >Product Category</label>
        <select  id="category" value={productData.category} onChange={handleChange}  required>
            <option value="">Category</option>
            <option value="electronicgadgets">Electronic Gadgets</option>
            <option value="clothing">Clothing</option>
            <option value="furniture">Furniture</option>
            <option value="cookware">Cookware</option>
            <option value="fashion">Fashion</option>
            <option value="sports">Sports</option>
            <option value="homeappliances">Home Appliances</option>
            <option value="grocery">Grocery</option>
            <option value="other">Other</option>
        </select>

        <label >Product Description</label>
        <textarea id="description" value={productData.description} onChange={handleChange} required/>

        <label >Product Previous Price</label>
        <input type="number"  id="prevprice" value={productData.prevprice} onChange={handleChange} required/>

        <label >Product New Price</label>
        <input type="number" id="newprice" value={productData.newprice} onChange={handleChange} required/>

        <label >Product Image</label>
        <input type="file" alt="Image" id="file" ref={fileInputRef} onChange={handleFileChange} />

        </div>
        </div>


        <button type="submit">Submit</button>
        </form>


        </div>
        </div>

  )
}