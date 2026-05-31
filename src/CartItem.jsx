import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { removeItem, updateQuantity } from './CartSlice';
import './CartItem.css';

const CartItem = ({ onContinueShopping }) => {
  const cart = useSelector((state) => state.cart.items);
  const dispatch = useDispatch();

  // Calculate the total amount of all items in the cart
  // Extracts numeric value from cost string (e.g., "$15" -> 15) and multiplies by quantity
  const calculateTotalAmount = () => {
    return cart
      .reduce((total, item) => {
        const costNumber = parseFloat(item.cost.replace(/[^0-9.]/g, '')) || 0;
        return total + costNumber * item.quantity;
      }, 0)
      .toFixed(2);
  };

  // Handle navigation back to product listing page
  const handleContinueShopping = (e) => {
    e.preventDefault();
    if (typeof onContinueShopping === 'function') {
      onContinueShopping();
    }
  };

  // Increment item quantity by 1
  const handleIncrement = (item) => {
    dispatch(updateQuantity({ name: item.name, quantity: item.quantity + 1 }));
  };

  // Decrement item quantity by 1
  // When quantity reaches zero, automatically remove the item from cart
  const handleDecrement = (item) => {
    const newQuantity = item.quantity - 1;
    
    // If new quantity would be zero or negative, remove item from cart
    if (newQuantity <= 0) {
      dispatch(removeItem(item.name));
    } else {
      // Otherwise, update the quantity
      dispatch(updateQuantity({ name: item.name, quantity: newQuantity }));
    }
  };

  // Remove item from cart immediately
  const handleRemove = (item) => {
    dispatch(removeItem(item.name));
  };

  // Calculate total cost for individual item
  // Extracts numeric value from cost string and multiplies by item quantity
  const calculateTotalCost = (item) => {
    const costNumber = parseFloat(item.cost.replace(/[^0-9.]/g, '')) || 0;
    return (costNumber * item.quantity).toFixed(2);
  };

  return (
    <div className="cart-container">
      {/* Display total cart amount */}
      <h2 style={{ color: 'black' }}>Total Cart Amount: ${calculateTotalAmount()}</h2>
      
      {/* Show empty cart message or render cart items */}
      {cart.length === 0 ? (
        <div style={{ color: '#333', marginTop: '20px' }}>
          Your cart is currently empty. Please add items from Plants.
        </div>
      ) : (
        <div className="cart-items-list">
          {/* Map through each item in cart and display its details */}
          {cart.map((item) => (
            <div className="cart-item" key={item.name}>
              {/* Product Image */}
              <img className="cart-item-image" src={item.image} alt={item.name} />
              
              {/* Product Details Section */}
              <div className="cart-item-details">
                {/* Product Name */}
                <div className="cart-item-name">{item.name}</div>
                
                {/* Unit Price */}
                <div className="cart-item-cost">Unit Price: {item.cost}</div>
                
                {/* Quantity Controls */}
                <div className="cart-item-quantity">
                  {/* Decrease quantity button - removes item when quantity reaches 0 */}
                  <button 
                    className="cart-item-button cart-item-button-dec" 
                    onClick={() => handleDecrement(item)}
                    aria-label={`Decrease quantity of ${item.name}`}
                  >
                    -
                  </button>
                  
                  {/* Current quantity display */}
                  <span className="cart-item-quantity-value">{item.quantity}</span>
                  
                  {/* Increase quantity button */}
                  <button 
                    className="cart-item-button cart-item-button-inc" 
                    onClick={() => handleIncrement(item)}
                    aria-label={`Increase quantity of ${item.name}`}
                  >
                    +
                  </button>
                </div>
                
                {/* Total cost for this item */}
                <div className="cart-item-total">Total: ${calculateTotalCost(item)}</div>
                
                {/* Delete item from cart button */}
                <button 
                  className="cart-item-delete" 
                  onClick={() => handleRemove(item)}
                  aria-label={`Delete ${item.name} from cart`}
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
      
      {/* Action Buttons Section */}
      <div className="continue_shopping_btn">
        {/* Continue Shopping - Navigate back to product listing */}
        <button 
          type="button" 
          className="get-started-button" 
          onClick={handleContinueShopping}
          aria-label="Continue shopping to view more plants"
        >
          Continue Shopping
        </button>
        <br />
        
        {/* Checkout Button - Shows placeholder message */}
        <button
          type="button"
          className="get-started-button1"
          onClick={() => alert('Coming Soon! Checkout functionality will be available soon.')}
          aria-label="Proceed to checkout"
        >
          Checkout
        </button>
      </div>
    </div>
  );
};

export default CartItem;


