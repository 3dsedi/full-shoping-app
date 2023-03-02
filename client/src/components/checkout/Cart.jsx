import React from 'react';
import './Cart.css'

function Cart(props) {
  const cartData = props.cartData
  const userData = props.userData
  if (!cartData) {
    return null;
  }

  if (cartData.items.length === 0) {
    return <div>
      <h2 className="cart-title"> Hello {userData.name} </h2>
      <h2 className="cart-empty"> Your cart is empty</h2>
    </div>;
  }

  return (
    <div >
      <p className="cart-title"> Hello {userData.name} </p>
      <p className="cart-total">You have {cartData.totalItems} items in your cart</p>
      <div className='cart-container'>
      <ul className="cart-items">
        {cartData.items.map(item => (
          <li key={item.productId} className="cart-item product">
            <img className="cart-thumbnail" src={item.imageUrl} alt={item.title} />
            <div className="cart-info">
              <p className="cart-item-title">{item.title}</p>
              <p className="cart-item-price">${item.price}</p>
              <button className="cart-delete-btn" onClick={() => props.deleteItemFromCart(cartData.cartId, item.productId)}>Delete</button>
            </div>
          </li>
        ))}
      </ul>
      <div className="cart-summary">
        <p className="cart-total-items">Total Items: {cartData.totalItems}</p>
        <p className="cart-total-amount">Total Amount: ${cartData.totalAmount}</p>
      </div>
      </div>
    </div>
  );
}

export default Cart;
