import React from "react";
import "./ShoppingCart.css"; // Import the CSS file for styling
import { FaShoppingCart } from "react-icons/fa"; // Import the shopping cart icon from react-icons library

const ShoppingCart = ({ cartItems, increaseQuantity, deleteItem }) => {
  const renderCartItems = () => {
    return cartItems.map((item) => (
      <div key={item.id} className="cart-item">
        <img
          src={
            "https://geektrust.s3.ap-southeast-1.amazonaws.com/coding-problems/shopping-cart/polo-tshirts.png"
          }
          alt={item.name}
        />
        <div className="cart-item-details">
          <h4>{item.name}</h4>
          <p>Price: {item.price}</p>
          <p>Quantity: {item.quantity}</p>
          <div className="cart-item-actions">
            <button onClick={() => increaseQuantity(item.id)}>+</button>
            <button onClick={() => deleteItem(item.id)}>Delete</button>
          </div>
        </div>
      </div>
    ));
  };

  const calculateTotalAmount = () => {
    let total = 0;
    cartItems.forEach((item) => {
      total += item.price * item.quantity;
    });
    return total.toFixed(2);
  };

  return (
    <div className="shopping-cart">
      <h2>
        <FaShoppingCart className="cart-icon" /> Shopping Cart
      </h2>
      {cartItems.length > 0 ? (
        <div>
          {renderCartItems()}
          <div className="cart-total">
            <p>Total Amount: ${calculateTotalAmount()}</p>
          </div>
        </div>
      ) : (
        <p>No items in the cart</p>
      )}
    </div>
  );
};

export default ShoppingCart;
