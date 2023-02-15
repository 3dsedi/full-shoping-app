import React from 'react'
import { Navigate } from 'react-router-dom';
import Unauthorized from './login/Unauthorized';
import ProductList from './Products/ProductList';

export const ProtectedRoute = ({ allowedRoles, userRole, products}) => {
    console.log(products)
    if (allowedRoles.includes(userRole)) {
      return <ProductList products={products} />
    } else {
      return <Unauthorized/>;
    }
};


