
import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import Product from '../components/products/Product';

const SelectedStore = (props) => {
  console.log(props)
  // const { storeId } = useParams();
  // const [products, setProducts] = useState([]);

  // useEffect(() => {
  //   async function fetchProducts() {
  //     try {
  //       const response = await fetch(`http://localhost:3001/api/store/${storeId}`);
  //       const products = await response.json();
  //       setProducts(products);
  //     } catch (error) {
  //       console.error(error);
  //     }
  //   }

  //   fetchProducts();
  // }, [storeId]);

  return (
    <div>
      <h1>Store {storeId} Products</h1>
      {/* <div className="products-container">
        {products.map((product, index) => (
          <Product key={index} product={product}  addToCart={addToCart}
          userData={userData} />
        ))}
      </div> */}
    </div>
  );
};

export default SelectedStore;
