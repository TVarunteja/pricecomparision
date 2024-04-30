import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import config from '../config'
export default function Login({onAdminLogin, onSellerLogin, onCustomerLogin}) 
{
      const [formData, setFormData] = useState({
        email: '',
        password: ''
      });
      const [message,setMessage] = useState("")
      const [error,setError] = useState("")
    
      const navigate = useNavigate();
    
      const handleChange = (e) => {
        const { id, value } = e.target;
        setFormData({ ...formData, [id]: value });
      };
    
      const handleSubmit = async (e) => {
        e.preventDefault();
        try 
        {
          let response = await axios.post(`${config.url}/checkadminlogin`, formData);
          if (response.data != null)
          {
            onAdminLogin();
    
            localStorage.setItem('admin', JSON.stringify(response.data));
    
            navigate("/adminhome");
          } 
          else 
          {
            response = await axios.post(`${config.url}/checksellerlogin`, formData);
            if (response.data != null)
            {
                onSellerLogin();
        
                localStorage.setItem('seller', JSON.stringify(response.data));
        
                navigate("/sellerhome");
            }
                    else 
                    {
                        response = await axios.post(`${config.url}/checkcustomerlogin`, formData);
                        if (response.data != null)
                        {
                            onCustomerLogin();
                    
                            localStorage.setItem('customer', JSON.stringify(response.data));
                    
                            navigate("/customerhome");
                        }
                            else
                            {
                                setMessage("Login Failed")
                                setError("")
                            }
                    }
          }

        } 
        catch (error) 
        {
          setMessage("")
          setError(error.message)
        }
      };
    const change=() =>
    {
        let container = document.querySelector(".container")
        let pwShowHide = document.querySelectorAll(".showHidePw")
        let pwFields = document.querySelectorAll(".password")
        let signUp = document.querySelector(".signup-link")
        let login = document.querySelector(".login-link")
  
      
          pwShowHide = document.querySelectorAll(".showHidePw")
          pwShowHide.forEach(eyeIcon =>{
              eyeIcon.addEventListener("click", ()=>{
                  pwFields.forEach(pwField =>{
                      if(pwField.type ==="password"){
                          pwField.type = "text";
      
                          pwShowHide.forEach(icon =>{
                              icon.classList.replace("uil-eye-slash", "uil-eye");
                          })
                      }else{
                          pwField.type = "password";
      
                          pwShowHide.forEach(icon =>{
                              icon.classList.replace("uil-eye", "uil-eye-slash");
                          })
                      }
                  }) 
              })
          })
      
          // js code to appear signup and login form
          signUp.addEventListener("click", ( )=>{
              container.classList.add("active");
          });
          login.addEventListener("click", ( )=>{
              container.classList.remove("active");
          });

    }
    

  

  return (
    <div>
      {
            message ? <h4 align="center">{message}</h4> : <h4 align="center" style={{color:"red"}}>{error}</h4>
      }



    <link rel="stylesheet" href="https://unicons.iconscout.com/release/v4.0.0/css/line.css"/>

    <link rel="stylesheet" href="style.css"/>
         
    <title>Login & Registration Form</title> 


    
    <div class="container">
        <div class="forms">
            <div class="form login" >
                <span class="title">Login</span>

                <form onSubmit={handleSubmit} >
                    <div class="input-field">
                        <input type="text" placeholder="Enter your email"  id="email" value={formData.username} onChange={handleChange} required />
                        <i class="uil uil-envelope icon"></i>
                    </div>
                    <div class="input-field">
                        <input type="password" class="password" placeholder="Enter your password" id="password" value={formData.password} onChange={handleChange} required />
                        <i class="uil uil-lock icon"></i>
                        <i class="uil uil-eye-slash showHidePw" ></i>
                    </div>

                    <div class="checkbox-text">
                        <div class="checkbox-content">
                            <input type="checkbox" id="logCheck"/>
                            <label for="logCheck" class="text">Remember me</label>
                        </div>
                        
                    </div>

                    <div class="input-field button" >
                    <input type="submit" value="Login"/>
                    </div>
                </form>





                <div class="login-signup">
                    <span class="text">Not a member?
                        <a href="#" class="text signup-link" >Signup Now</a>
                    </span>
                </div>
            </div>

           
        </div>
    </div>


    </div>
  )
}
