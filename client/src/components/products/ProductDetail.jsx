import React, {useState} from 'react'

import { useParams } from "react-router-dom";
import './ProductDetail.css'

function ProductDetail({ products ,stores, addToCart, userData }) {
  const { id } = useParams();
  const product = products.find((p) => p.productId === id);
  const store = stores.find((s) => s.id === product.storeId);
  const userId = userData.id;
  const productId = product.productId;
  console.log('sedi')


  return (
    <div >
      <p className='product_detail_title'>{product.title}</p>
      <div className='product-detail'>
        <img className='product-img' src={product.imageUrl} alt={product.title}  />
        <div className='product-info'>
          <p className='product_detail_more_b'>more about this product:  </p>
          <p className='product_detail_more'>{product.description}</p>
          <p className='product_detail_price'>Price: ${product.price}</p>
          <p className={`product_detail_quantity ${product.quantity > 10 ? 'more-than-10' : 'less-than-10'}`}>
      {product.quantity} in stock
    </p>
    <button className="add_to_cart" onClick={() => addToCart(userId, productId)}>Add to Cart</button>
        </div>
      </div>
      <hr />
      <div className='store-info'>
      <h3>Store Info</h3>
      {/* <p>{store.storeName}</p> */}
      </div>
     
    </div>
  );
}


export default ProductDetail

