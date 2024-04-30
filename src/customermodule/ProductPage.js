import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './ProductPage.css'
import config from '../config';
import { useLocation ,useNavigate  } from 'react-router-dom';
export default function ProductPage() {
    const location = useLocation()
    const pid = location.state.param1;
    const email=location.state.param2;
  


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
    }
  };

  useEffect(() => {
    productpage();
  },[]);



  

 const [customerData, setCustomerData] = useState("");

 useEffect(() => {
   const storedCustomerData = localStorage.getItem('customer');
   if (storedCustomerData) {
     const parsedCustomerData = JSON.parse(storedCustomerData);
     setCustomerData(parsedCustomerData)
   }
 }, []);



 const [message, setMessage] = useState('');
 const [serror, setSerror] = useState('');




 const addtocart = async (productid, customeremail) => {
     try 
     {
      console.log(customeremail)
       const response = await axios.post(`${config.url}/addtocart`, { productid, customeremail });
       setMessage(response.data);
       setSerror('');
     }
     catch (error)
     {
        setSerror(error.response.data);
       setMessage('');
     }
   }

   const productpurchase = async (productid, customeremail) => {
    try 
    {
     console.log(customeremail)
      const response = await axios.post(`${config.url}/productpurchase`, { productid, customeremail });
      setMessage(response.data);
      setSerror('');
    }
    catch (error)
    {
       setSerror(error.response.data);
      setMessage('');
    }
  }


   const navigate = useNavigate();
   const removefromcart = async (productid, customeremail) => {
    if(window.confirm("Are you sure want to remove this product from cart?"))
    {
      try
      {
      
        const response = await axios.delete(`${config.url}/removefromcart/${productid}/${customeremail}`);
        setMessage(response.data);
        console.log(response.data);
        navigate('/cart')
        setSerror('');
      }
      catch (error)
      {
        setSerror(error.response.data);
        setMessage('');
      }
    }
    else
    {
      productpage();
    }

  }









   const [status, setStatus] = useState('');

   const getcartstatus = async (productid, customeremail) => {
    try 
    {
      console.log(productid)
      const response = await axios.post(`${config.url}/getcartstatus`,  { productid, customeremail } );
      setStatus(response.data);
      console.log(response.data);
    } 
    catch (error)
    {
       setSerror(error.response.data);
    }
  }

  useEffect(() => {
    
    getcartstatus(pid,email)
    
  }, []);
  


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
    <div class="swiper-slide">
        <img src="images/1.jpg" alt='image'/>
    </div>
    <div class="swiper-slide">
        <img src="images/3.jpg" />
    </div>
    <div class="swiper-slide">
        <img src="images/1.jpg" />
    </div>

    </div>

   {/*<div class="slider-btns">
        <div class="swiper-button-prev"></div>
        <div class="swiper-button-next"></div>
  </div>*/}
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
            <span class="product-price">&#8377;{data[0].newprice}</span>
            <p>{data[0].description}<br/>
            </p>
            <br/>
            <br/>
      
{ status === 'Add to cart'?
<div class="product-button">
                <div class="add-bag-btn" onClick={() => addtocart(data[0].productid,customerData.email)}>{status}</div>
                <div class="add-bag-btn" onClick={() => productpurchase(data[0].productid,customerData.email)}>Purchase</div></div>   :

 <div class="product-button">
 <div class="add-bag-btn" onClick={() => removefromcart(data[0].productid,customerData.email)}>Remove from Cart</div>


<div class="add-bag-btn" onClick={() => productpurchase(data[0].productid,customerData.email)} >  Purchase  </div>
  </div>
  

}
<div class="product-button">
 <div class="add-bag-btn"  onClick={() =>navigate('/recommendproduct',{state : { param1: data[0].productname, param2: customerData.email}}) }> Recommend </div>
<div class="add-bag-btn"  onClick={() =>navigate('/pricecomparision',{state : { param1: data[0].productid}})} >  Price Compare  </div>
  </div>

            <a href="#" class="help-btn">Need Any Help?</a>
        </div>
    </div>
    </section>

    </div>
  )
}
