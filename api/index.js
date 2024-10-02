const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const port = 8000;

// Serve static files like images and CSS from the 'public' folder
app.use(express.static('public')); 

app.use(bodyParser.json());

// Mock data for the store
const products = [
    { id: 1, name: 'Stylish Jacket', price: 99, image: '/images/jacket.jpg' },
    { id: 2, name: 'Casual Sneakers', price: 79, image: '/images/sneakers.jpeg' },
    { id: 3, name: 'Leather Bag', price: 120, image: '/images/bag.jpeg' },
    { id: 4, name: 'Sunglasses', price: 49, image: '/images/sunglasses.jpeg' },
    { id: 5, name: 'Jeans', price: 59, image: '/images/jeans.jpeg' },
    { id: 6, name: 'T-Shirt', price: 29, image: '/images/tshirt.jpeg' },
    { id: 7, name: 'Cap', price: 19, image: '/images/cap.jpeg' },
    { id: 8, name: 'Watch', price: 199, image: '/images/watch.jpeg' },
    { id: 9, name: 'Belt', price: 39, image: '/images/belt.jpeg' },
    { id: 10, name: 'Boots', price: 99, image: '/images/boots.jpeg' }
];

// Mock data for orders
const orders = [
    { orderId: 1, productId: 1, quantity: 2 },
    { orderId: 2, productId: 3, quantity: 1 },
    { orderId: 3, productId: 5, quantity: 4 }
];

// Route: GET /products - Returns a list of products
app.get('/products', (req, res) => {
    res.status(200).json(products);
});

// Route: GET /orders - Returns a list of orders
app.get('/orders', (req, res) => {
    res.status(200).json(orders);
});

// Route: Base Route - Serves the homepage
app.get('/', (req, res) => {
    let productHTML = products.map(product => `
        <div class="product">
            <img src="${product.image}" alt="${product.name}">
            <h2>${product.name}</h2>
            <p>$${product.price}</p>
            <button onclick="addToCart(${product.id})">Add to Cart</button>
        </div>
    `).join('');

    res.send(`
      <html>
        <head>
          <title>Lasgidi Fashion Store</title>
          <style>
            body {
              font-family: 'Arial', sans-serif;
              background-color: #fafafa;
              color: #333;
              margin: 0;
              padding: 0;
              text-align: center;
            }
            header {
              background-color: #222;
              color: white;
              display: flex;
              justify-content: space-between;
              align-items: center;
              padding: 10px 50px;
            }
            header a {
              color: white;
              text-decoration: none;
              font-size: 18px;
              padding: 10px;
            }
            header a:hover {
              text-decoration: underline;
            }
            h1 {
              margin-top: 0;
            }
            .menu {
              display: flex;
              gap: 20px;
            }
            .cart-icon {
              position: relative;
            }
            .cart-icon img {
              width: 30px;
            }
            .cart-count {
              background: red;
              color: white;
              border-radius: 50%;
              position: absolute;
              top: -5px;
              right: -10px;
              padding: 3px 6px;
              font-size: 12px;
            }
            .products {
              display: flex;
              flex-wrap: wrap;
              justify-content: space-around;
              margin: 30px 0;
            }
            .product {
              background-color: white;
              border-radius: 10px;
              box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
              padding: 20px;
              margin: 20px;
              width: 200px;
              text-align: center;
            }
            .product img {
              width: 100%;
              height: auto;
              border-radius: 5px;
            }
            footer {
              background-color: #222;
              color: white;
              padding: 10px 0;
              margin-top: 20px;
            }
          </style>
        </head>
        <body>
          <header>
            <h1>Lasgidi Fashion Store</h1>
            <nav class="menu">
              <a href="/">Home</a>
              <a href="/cart">Cart</a>
              <a href="/voice-order">Voice Order</a>
            </nav>
            <div class="cart-icon">
              <a href="/cart">
                <img src="https://img.icons8.com/material-rounded/24/ffffff/shopping-cart.png" />
                <div class="cart-count" id="cartCount">0</div>
              </a>
            </div>
          </header>

          <div class="products">
            ${productHTML}
          </div>

          <footer>
            <p>&copy; 2024 Lasgidi Fashion Store. All rights reserved.</p>
          </footer>

          <script>
            let cart = JSON.parse(localStorage.getItem('cart')) || [];

            function updateCartCount() {
              document.getElementById('cartCount').textContent = cart.length;
            }

            function addToCart(productId) {
              const product = ${JSON.stringify(products)}.find(p => p.id === productId);
              cart.push(product);
              localStorage.setItem('cart', JSON.stringify(cart));
              updateCartCount();
              alert('Added to cart: ' + product.name);
            }

            // Initialize cart count on page load
            updateCartCount();
          </script>
        </body>
      </html>
    `);
});

// Start the server
app.listen(port, () => {
    console.log(`Lasgidi store API running on http://localhost:${port}`);
});

module.exports = app; // Export the app after all routes are defined.
