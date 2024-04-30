import React, { useState } from "react";

import { Route, Routes, Link , useNavigate } from 'react-router-dom'
import config from '../config'

import CustomerHome from './CustomerHome'
import CustomerAbout from './CustomerAbout'
import CustomerCart from './CustomerCart'
import CustomerContact from './CustomerContact'
import CustomerProfile from './CustomerProfile'
import UpdateCustomerProfile from "./UpdateCustomerProfile";
import CustomerPurchase from "./CustomerPurchase";
import './Navbar.css'
import ProductPage from "./ProductPage";
import RecommendProduct from './RecommendProduct'
import Recommendations from './Recommendations'
import PriceComparision from './PriceComparision'
export const Header = () => {

  
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('isCustomerLoggedIn');
    localStorage.removeItem('customer');

    navigate('/');
    window.location.reload()
  };

  const [showMenu, setShoMenu] = useState(false);
  const handleshowMenu =()=>{
  setShoMenu(preve=>!preve)
  }
  
  return (
    <div>
      <nav>
        <ul>
          <li>
          <Link to={"/customerhome"} className="ml-4">   Home    </Link>
          </li>

          <li>
          <Link to={"/contact"} className="ml-4"> Contact  </Link>
          </li>

          <li>
          <Link to={"/profile"} className="ml-4"> Profile  </Link>
          </li>
        
          <li>
          <Link to={"/cart"} className="ml-4"> Cart  </Link>
          </li>

          <li>
          <Link to={"/CustomerPurchase"} className="ml-4"> Your Orders  </Link>
          </li>

          <li>
          <Link to={"/viewrecommendations"} className="ml-4"> Recommendations  </Link>
          </li>

          <li>
          <Link to={"/logout"} className="ml-4"> Logout  </Link>
          </li>
        </ul>       
      </nav>

        <div>
        <Routes>
         <Route path="/customerhome" Component={CustomerHome} />
         <Route path="/about" Component={CustomerAbout} />
         <Route path="/contact" Component={CustomerContact} />
         <Route path="/cart" Component={CustomerCart} />
         <Route path="/productpage" Component={ProductPage} />
         <Route path="/profile" Component={CustomerProfile} />
         <Route path="/updatecustomerprofile" Component={UpdateCustomerProfile} />
         <Route path="/CustomerPurchase" Component={CustomerPurchase} />
         <Route path="/recommendproduct" Component={RecommendProduct} />
         <Route path="/viewrecommendations" Component={Recommendations} />
         <Route path="/pricecomparision" Component={PriceComparision} />
         <Route path="/logout" Component={handleLogout} />
        </Routes>
        </div>
        </div>
      
  );
};

export default Header;


