import './App.css';
import React, { useState, useEffect } from 'react';
import { BrowserRouter as R } from 'react-router-dom';
import CustomerNavBar from './customermodule/CustomerNavBar'
import SellerNavBar from './sellermodule/SellerNavBar'
import MainNavBar from './main/MainNavBar';
import AdminNavBar from './adminmodule/AdminNavBar'
function App() 
{

  const [isAdminLoggedIn, setIsAdminLoggedIn] = useState(false);
  const [isSellerLoggedIn, setIsSellerLoggedIn] = useState(false);
  const [isCustomerLoggedIn, setIsCustomerLoggedIn] = useState(false);

  useEffect(() => {
    const adminLoggedIn = localStorage.getItem('isAdminLoggedIn') === 'true';
    const sellerLoggedIn = localStorage.getItem('isSellerLoggedIn') === 'true';
    const customerLoggedIn = localStorage.getItem('isCustomerLoggedIn') === 'true';
    
    setIsAdminLoggedIn(adminLoggedIn);
    setIsSellerLoggedIn(sellerLoggedIn);
    setIsCustomerLoggedIn(customerLoggedIn);
  }, []);

  const onAdminLogin = () => {
    localStorage.setItem('isAdminLoggedIn', 'true');
    setIsAdminLoggedIn(true);
  };

  const onSellerLogin = () => {
    localStorage.setItem('isSellerLoggedIn', 'true');
    setIsSellerLoggedIn(true);
  };

  const onCustomerLogin = () => {
    localStorage.setItem('isCustomerLoggedIn', 'true');
    setIsCustomerLoggedIn(true);
  };

  return (
    <div className="App">
      <h3 align="center">E Commerce Application</h3>
      <R>
        {isAdminLoggedIn ? (
          <AdminNavBar />
        ) : isSellerLoggedIn ? (
          <SellerNavBar />
        ) : isCustomerLoggedIn ? (
          <CustomerNavBar />
        ) : (
          <MainNavBar
            onAdminLogin={onAdminLogin}
            onSellerLogin={onSellerLogin}
            onCustomerLogin={onCustomerLogin}
          />
        )}
      </R>
    </div>
  );



}

export default App;

