import React from "react";

import { Route, Routes, Link , useNavigate } from 'react-router-dom'

import './Navbar.css'
import config from '../config'

import AdminHomePage from './AdminHomePage'
import ViewCustomers from "./ViewCustomers";
import ViewSellers from "./ViewSellers";
import AddSeller from './AddSeller';
import AdminProductPage from "./AdminProductPage";


export const Header = () => 
{

  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('isAdminLoggedIn');
    localStorage.removeItem('admin');

    navigate('/');
    window.location.reload()
  };

  return (
    <div>
    
    
      <nav>
        
        <ul>
          <li>
          <Link to={"/adminhome"} className="ml-4">   Home    </Link>
          </li>

          <li>
          <Link to={"/viewcustomers"} className="ml-4">  View Customers  </Link>
          </li>
          

          <li>
          <Link to={"/viewsellers"} className="ml-4">  View Sellers  </Link>
          </li>

          <li>
          <Link to={"/addseller"} className="ml-4">  Add Seller   </Link>
          </li>

          <li>
          <Link to={"/logout"} className="ml-4">  Logout  </Link>
          </li>
        </ul>       
      </nav>
      

        <div>
        <Routes>
          <Route path="/adminhome" Component={AdminHomePage} />
          <Route path="/logout" Component={handleLogout} />
          <Route path="/viewcustomers" Component={ViewCustomers} />
          <Route path="/viewsellers" Component={ViewSellers} />
          <Route path="/adminproductpage" Component={AdminProductPage} />
          <Route path="/addseller" Component={AddSeller} />

        </Routes>
        </div>
        </div>
      
  );
};

export default Header;