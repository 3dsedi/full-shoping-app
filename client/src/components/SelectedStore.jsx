
import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import Product from './products/Product';
import { Link } from "react-router-dom";
import './store/StoreProductList.css'
import { useNavigate } from "react-router-dom";
import { FaArrowLeft } from 'react-icons/fa';

const SelectedStore = ({products, stores, userData, addToCart}) => {

  const { id } = useParams();
  const storeProduct = products.filter(product => product.storeId === id);
  const navigate = useNavigate();

  const handleGoBack = () => {
    navigate(-1); 
  };


  const store = stores.find((s) => s.storeId === id);
  console.log(store)


  return (
    <div>
      <button onClick={handleGoBack} className="back_button"><FaArrowLeft /></button>
   
    <div className="store-container">
      <p className="store_product_p"> {store.storeName} Store Products</p>
      <br/>
      <p className="store_product_count"> There is {storeProduct.length} product availble in this Store</p>

      <div>
        {storeProduct.map((p, index) => (
          <Link key={index} to={`/products/${p.productId}`}>
            <Product product={p} userData={userData} addToCart={addToCart} />
          </Link>
        ))}
      </div>
    </div>
    </div>
  );
};

export default SelectedStore;
