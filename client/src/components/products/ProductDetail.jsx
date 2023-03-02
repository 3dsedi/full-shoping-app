import React from 'react'

import { useParams } from "react-router-dom";
import './ProductDetail.css'

function ProductDetail({ products ,stores }) {
  const { id } = useParams();
  const product = products.find((p) => p.productId === id);
  const store = stores.find((s) => s.id === product.storeId);

  return (
    <div >
      <h2>{product.title}</h2>
      <div className='product-detail'>
        <img className='product-img' src={product.imageUrl} alt={product.title}  />
        <div className='product-info'>
          <p>{product.description}</p>
          <p>Price: {product.price}</p>
          <p>Quantity: {product.quantity}</p>
          <button>Add to Cart</button>
        </div>
      </div>
      <hr />
      {/* <div className='store-info'>
      <h3>Store Info</h3>
      <p>{store.storeName}</p>
      </div> */}
     
    </div>
  );
}


export default ProductDetail