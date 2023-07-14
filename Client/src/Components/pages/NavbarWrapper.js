import React from 'react';
import { useLocation } from 'react-router-dom';
import Navbar from '../navbar/navbar';

const NavbarWrapper = () => {
  const location = useLocation();
  const hideNavbarOnRoutes = ['/Dashboard' ]; // Specify the routes where you want to hide the navigation bar

  if (hideNavbarOnRoutes.includes(location.pathname)) {
    return null; // Do not render the navigation bar for the specified routes
  }
  

  return <Navbar />;
};

export default NavbarWrapper;
