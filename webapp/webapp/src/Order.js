// src/components/Order.js

import React, { useState } from 'react';
import axios from 'axios';

const Order = () => {
  const [productId, setProductId] = useState('');
  const [quantity, setQuantity] = useState(1);

  const handleOrder = () => {
    axios.post('http://localhost:3000/orders', {
      productId: parseInt(productId),
      quantity: quantity,
    })
    .then(response => {
      alert(`Order placed: ${response.data.order.product} - Quantity: ${response.data.order.quantity}`);
    })
    .catch(error => {
      console.error('Error placing order:', error);
    });
  };

  return (
    <div>
      <h2>Place an Order</h2>
      <div>
        <label>Product ID: </label>
        <input
          type="text"
          value={productId}
          onChange={(e) => setProductId(e.target.value)}
        />
      </div>
      <div>
        <label>Quantity: </label>
        <input
          type="number"
          value={quantity}
          onChange={(e) => setQuantity(e.target.value)}
          min="1"
        />
      </div>
      <button onClick={handleOrder}>Place Order</button>
    </div>
  );
};

export default Order;
