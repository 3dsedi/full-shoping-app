import React from "react";
import "./StoreProduct.css";

const StoreProduct = (product) => {
  return (
    <div className={"store_product_container"}>
      <p className="store_product_title">{product.product.title} </p>
      <img src={product.product.imageUrl} alt={"picture of product"} />
      <div>
      <p className={`store_product_quantity ${product.product.quantity > 10 ? 'more-than-10' : 'less-than-10'}`}>
      {product.product.quantity} in stock
    </p>
        <p className="store_product_price"> ${product.product.price}</p>
        <button className="edit" >Edit</button>
      </div>
    </div>
  );
};

export default StoreProduct;
