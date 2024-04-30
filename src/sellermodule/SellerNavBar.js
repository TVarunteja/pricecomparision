import React from "react";

import { Route, Routes, Link ,useNavigate} from 'react-router-dom'
import config from '../config'

import './Navbar.css'

import SellerHomePage from './SellerHomePage'
import SellerAddProductPage from "./SellerAddProduct";
import SellerProducts from "./SellerProducts";
import SellerProductPage from "./SellerProductPage";
import UpdateProductDetails from "./UpdateProductDetails";
import DeleteProduct from './DeleteProduct'
import SellerProfile from './SellerProfile'
import UpdateSellerProfile from './UpdateSellerProfile'

export const Header = () => {
  
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('isSellerLoggedIn');
    localStorage.removeItem('seller');

    navigate('/');
    window.location.reload()
  };
  
  return (
    <div>
    
    
      <nav>
        
        <ul>
          <li>
          <Link to={"/sellerhome"} className="ml-4">   Home    </Link>
          </li>

           <li className="dropdown">
            <Link>Products</Link>
            <div className="dropdown-content">
            <Link to={"/addproduct"} className="ml-4">Add Product</Link>
            <Link to={"/deleteproducts"}>Delete Product</Link>
            </div>
          </li> 

          <li>
          <Link to={"/sellerprofile"} className="ml-4">   Profile    </Link>
          </li>

          <li>
          <Link to={"/logout"} className="ml-4"> Logout  </Link>
          </li>
        </ul>       
      </nav>


        <div>
        <Routes>
         <Route path="/sellerhome" Component={SellerHomePage} />
         <Route path="/addproduct" Component={SellerAddProductPage} />
         <Route path="/SellerProducts" Component={SellerProducts} />
         <Route path="/sellerproductpage" Component={SellerProductPage} />
         <Route path="/deleteproducts" Component={DeleteProduct} />
         <Route path="/updateproductdetails" Component={UpdateProductDetails} />
         <Route path="/sellerprofile" Component={SellerProfile} />
         <Route path="/updatesellerprofile" Component={UpdateSellerProfile} />
         <Route path="/logout" Component={handleLogout} />
        
        </Routes>
        </div>
        </div>
      
  );
};

export default Header;


