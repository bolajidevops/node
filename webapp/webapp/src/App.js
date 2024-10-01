// src/App.js

import React from 'react';
import ProductList from './ProductList';
import Login from './Login';
import Order from './Order';
import './App.css';  // Import the new stylesheet

const App = () => {
  return (
    <div className="App">
      <header>
        <h1>Lasgidi Fashion Store</h1>
      </header>
      <div className="container">
        <div className="flex-container">
          <Login />
          <ProductList />
          <Order />
        </div>
      </div>
    </div>
  );
};

export default App;