import React, { useState } from "react";
import StoreProduct from "./StoreProduct";
import { Link} from 'react-router-dom';

function StoreProductList({ storeData, storeProducts, addNewProduct  }) {
  const [filteredProducts, setFilteredProducts] = useState(storeProducts);
  const [sortOrder, setSortOrder] = useState("default");
console.log(storeData)
  
  const sortProducts = (order) => {
    let sorted = [...filteredProducts];
    switch (order) {
      case "quantity-low-to-high":
        sorted.sort((a, b) => a.quantity - b.quantity);
        break;
      case "quantity-high-to-low":
        sorted.sort((a, b) => b.quantity - a.quantity);
        break;
      case "date-new-to-old":
        sorted.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
        break;
      case "date-old-to-new":
        sorted.sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt));
        break;
      default:
        break;
    }
    setFilteredProducts(sorted);
    setSortOrder(order);
  };

  return (
    <div>
      <h2>{storeData[0].name}</h2>
      <div>
        <label>Sort by:</label>
        <select onChange={(event) => sortProducts(event.target.value)}>
          <option value="default">Default</option>
          <option value="quantity-low-to-high">Quantity: Low to High</option>
          <option value="quantity-high-to-low">Quantity: High to Low</option>
          <option value="date-new-to-old">Date: New to Old</option>
          <option value="date-old-to-new">Date: Old to New</option>
        </select>
        <li>
        <Link to="/create-new-product">Add new Product</Link>
      </li>
      </div>
      <div>
        {filteredProducts.map((product , index) => (
          <StoreProduct key={index} product={product} />
        ))}
      </div>
    </div>
  );
}

export default StoreProductList;
