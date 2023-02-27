import React from 'react';

function Cart(props) {
 const cartData = props.cartData
 console.log(props)
 const userData = props.userData
  if (!cartData) {
    return null;
  }

  if (cartData.items.length === 0) {
    return <div>
      <h2> Hello {userData.name} </h2>
      <h2> Your cart is empty</h2>
    </div>;
  }

  return (
    <div >
      <h2> Hello {userData.name} </h2>
      <h2>You have {cartData.totalItems} items in your cart</h2>
      <ul>
        {cartData.items.map(item => (
          <li key={item.productId} className={"product_item product"}>
            <h4>{item.title}</h4>
           <h5>price: ${item.price}</h5>
           <button onClick={() =>props.deleteItemFromCart(cartData.cartId, item.productId )}>Delete</button> 
          </li>
        ))}
      </ul>
      <p>Total Items: {cartData.totalItems}</p>
      <p>Total Amount: {cartData.totalAmount}</p>
    </div>
  );
}

export default Cart;
