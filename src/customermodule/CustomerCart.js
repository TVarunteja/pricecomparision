import React, { useState, useEffect } from 'react';
import axios from 'axios';
import "./Product.css";
import { useNavigate } from 'react-router-dom';
import config from '../config'
import { BsFillBagFill } from "react-icons/bs";
export default function CustomerCart() 
{
  
 const [customerData, setCustomerData] = useState([]);
 let cemail=""
 useEffect(() => {
   const storedCustomerData = localStorage.getItem('customer');
   if (storedCustomerData) {
     const parsedCustomerData = JSON.parse(storedCustomerData);
     setCustomerData(parsedCustomerData)
      cemail=parsedCustomerData.email
   }
 }, []);


  const [products, setProducts] = useState([]);

  const fetchProducts = async () => {
    try {
      console.log(cemail)
      const response = await axios.get(`${config.url}/getaddedtocart/${cemail}`);
      console.log(response.data)
      setProducts(response.data);
    } catch (error) {
      console.error(error.message);
    }
  };
  
  useEffect(() => {
    fetchProducts();
  }, []);



  const navigate = useNavigate();

  const [product, setProduct] = useState({});
  const [error, setError] = useState('');

  const productpage = async (productid) => {
    try 
    {
      navigate('/productpage',{state : { param1: productid, param2: customerData.email}}   )
      
    } 
    catch (error) 
    {
      setError(error.response.data);
    }
  };





      
      return (
        <div>
        <section className="card-container" >
          {products.length > 0 ? (
  products.map((product, index) => (

<section className="card" onClick={() => productpage(product.productid)}>
        <img src={`${config.url}/productimage/${product.file}`} alt={"title"} className="card-img" />
        <div className="card-details">
          <p className="card-title">{product.productname}</p>
          <p align="left">Price</p>
          <section className="card-price">
            <div className="price">
              $<del style={{textDecoration:"line-through"}}>{product.prevprice}</del> {product.newprice}
            </div>
            <div className="bag">
              <BsFillBagFill className="bag-icon" />
            </div>
          </section>
        </div>
      </section>

    ))):(
      <div align="center">No Products are added to cart.</div>
    )
    
        }

        </section>
        
        </div>
      )
}
