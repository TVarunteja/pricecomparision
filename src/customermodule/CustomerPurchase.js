import React, { useState, useEffect } from 'react';
import axios from 'axios';
import "./Product.css";
import { useNavigate } from 'react-router-dom';
import config from '../config'
import { BsFillBagFill } from "react-icons/bs";
export default function CustomerPurchase() 
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
      const response = await axios.get(`${config.url}/getpurchased/${cemail}`);
      console.log(response.data)
      setProducts(response.data);
    } catch (error) {
      console.error(error.message);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const [totalamount, setTotalamount] = useState(0);

  const [status, setStatus] = useState(0);

  const getpurchasecount = async (productid, customeremail) => {
   try 
   {
     console.log(productid)
     const response = await axios.post(`${config.url}/getpurchasecount`,  { productid, customeremail }) ;
     setStatus(response.data);
     console.log(response.data);
   } 
   catch (error)
   {
      setError(error.response.data);
   }
 }

  

 
  




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
          {
          products.length > 0 ? (
          products.map((product, index) => (
        <div class="product-card">
                    <script></script>

            <img src={`${config.url}/productimage/${product.file}`} alt="Product Image"/>
            <div class="product-det">
                <h2>{product.productname}</h2>
                <p>{product.description}</p>
            </div>
            <div class="price-add-to-cart">
                <p>&#8377;{product.newprice}</p>
                <b >Purchased</b>
            </div>
        </div>

            ))):(
              <div align="center">No Products are Purchased</div>
            )
    
        }
        
        </section>
        </div>
      )
}
