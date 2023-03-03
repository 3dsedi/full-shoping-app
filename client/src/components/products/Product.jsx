import "./Product.css";

function Product({ product, addToCart, userData }) {
  const productId = product.productId;
  const userId = userData.id;
  
 
  return (
    <div className={"product_container"}>
      <p className="product_title">{product.title} </p>
      <img src={product.imageUrl} alt={"picture of product"} />
      <div>
        <p className={`product_quantity ${product.quantity > 10 ? 'more-than-10' : 'less-than-10'}`}>
      {product.quantity} in stock
    </p>
    <p className="product_price"> ${product.price}</p>
      <button className="add_to_cart" onClick={() => addToCart(userId, productId)}>Add to Cart</button>
      </div>
    </div>
  );
}

export default Product;
