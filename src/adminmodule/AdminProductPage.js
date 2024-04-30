import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './ProductPage.css'
import config from '../config';
import { useLocation ,useNavigate  } from 'react-router-dom';
export default function AdminProductPage() {
    const location = useLocation()
    const pid = location.state;
  

    const [counts, setCounts] = useState(null);

    const [purchasecount, setPurchaseCount] = useState(null);
    const [data, setData] = useState([{}]);
    const [error, setError] = useState('');



  const productpage = async () => {
    try 
    {
      const response = await axios.get(`${config.url}/getproductdetails/${pid}`);
      console.log(response.data)
      setData((response.data))
    }
    catch (error) 
    {
      setError(error.response.data);
      console.log(error)
    }
  };

  const addedtocartcount = async () => {
    try {
        
      const response = await axios.get(`${config.url}/addedtocartcount/${pid}`);
      setCounts(response.data);
    } catch (error) {
      setError('Failed to fetch counts');
    }
  };

  const purchasedcount = async () => {
    try {
        
      const response = await axios.get(`${config.url}/purchasedcount/${pid}`);
      setPurchaseCount(response.data);
    } catch (error) {
      setError('Failed to fetch counts');
    }
  };



  useEffect(() => {
    productpage();     
    addedtocartcount();
    purchasedcount();
  },[]);


  




 const [message, setMessage] = useState('');










  return (
    
    <div>
      {message ? <h4 align="center">{message}</h4> : null}
    
    <section class="product-details">
    <div class="product-img">

<div class="swiper mySwiper">
    <div class="swiper-wrapper">
    
    <div class="swiper-slide">
        
    <img src={`${config.url}/productimage/${data[0].file}`} alt="image"/>
    </div>
    
    </div>

   
</div>


   
</div>
        <div>
       <title>Product Page HTML</title>
        <link rel="stylesheet" href="/ProductPage.css"/>
        <link rel="preconnect" href="https://fonts.googleapis.com"/>
        <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin/>
        <link href="https://fonts.googleapis.com/css2?family=DM+Serif+Display:ital@0;1&family=Poppins:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900&display=swap" rel="stylesheet"/>
        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.2.0/css/all.min.css"/>
    
       <link
          rel="stylesheet"
          href="https://cdn.jsdelivr.net/npm/swiper/swiper-bundle.min.css"
        />
    
       
        <div class="product-text">
            <span class="product-category"></span>
            <h3>{data[0].productname}</h3>
            <span class="product-price">${data[0].newprice}</span>
            <p>{data[0].description}
            </p>
            <br/>
            <br/>
      {counts && purchasecount?<div><div class="product-button">
                <div > No.of Customers Added to Cart : {counts.addedcount} </div>

                <div> No.of Customers Purchased : {purchasecount.purchasedcount}</div></div>
                
                </div>:<div></div>}
                <div><div class="product-button">
                <div ><u>Seller-Email</u> : {data[0].seller} </div>
                
                </div><div></div>
                <div class="product-button">
                </div>
                </div>
        </div>
    </div>
    </section>

    </div>
  )
}
