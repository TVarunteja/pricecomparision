import React from 'react';
import { Routes, Route, Link } from 'react-router-dom';
import './Navbar.css'
import Login from './Login'
import SignUp from './SignUp';
import config from '../config'
export default function MainNavBar({onAdminLogin, onSellerLogin, onCustomerLogin}) {
  return (
    <div>
      <nav>
      <ul>
          <li><Link to="/">Login</Link></li>
          <li><Link to="/signup">Sign up</Link></li>
        </ul>
      </nav>

      <Routes>
        <Route path="/" element={<Login onAdminLogin={onAdminLogin}  onSellerLogin={onSellerLogin} onCustomerLogin={onCustomerLogin}/>} exact />
        <Route path="/signup" element={<SignUp/>} exact />
      </Routes>
    </div>
  );
}