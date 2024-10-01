const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const port = 8000;

app.use(bodyParser.json());
app.use(express.static('public'));  // To serve static files like images and CSS

// Mock data for the store
const products = [
    { id: 1, name: 'Stylish Jacket', price: 99, image: '/images/jacket.jpg' },
    { id: 2, name: 'Casual Sneakers', price: 79, image: '/images/sneakers.jpg' },
    { id: 3, name: 'Leather Bag', price: 120, image: '/images/bag.jpg' },
    { id: 4, name: 'Sunglasses', price: 49, image: '/images/sunglasses.jpg' },
    { id: 5, name: 'Jeans', price: 59, image: '/images/jeans.jpg' },
    { id: 6, name: 'T-Shirt', price: 29, image: '/images/tshirt.jpg' },
    { id: 7, name: 'Cap', price: 19, image: '/images/cap.jpg' },
    { id: 8, name: 'Watch', price: 199, image: '/images/watch.jpg' },
    { id: 9, name: 'Belt', price: 39, image: '/images/belt.jpg' },
    { id: 10, name: 'Boots', price: 99, image: '/images/boots.jpg' }
];

let orders = [];
let cart = [];

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
              padding: 20px 0;
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
            let cart = [];

            function addToCart(productId) {
              const product = ${JSON.stringify(products)}.find(p => p.id === productId);
              cart.push(product);
              document.getElementById('cartCount').textContent = cart.length;
              alert('Added to cart: ' + product.name);
            }
          </script>
        </body>
      </html>
    `);
});

// Route: Cart Page
app.get('/cart', (req, res) => {
    if (cart.length === 0) {
        res.send(`
            <html>
              <body>
                <h1>Your Cart is Empty</h1>
                <a href="/">Go Back to Products</a>
              </body>
            </html>
        `);
    } else {
        let cartHTML = cart.map(item => `
            <div class="cart-item">
                <img src="${item.image}" alt="${item.name}">
                <h2>${item.name}</h2>
                <p>$${item.price}</p>
            </div>
        `).join('');

        res.send(`
            <html>
              <body>
                <h1>Your Cart</h1>
                <div class="cart-items">${cartHTML}</div>
                <p>Total: $${cart.reduce((total, item) => total + item.price, 0)}</p>
                <a href="/">Go Back to Products</a>
              </body>
            </html>
        `);
    }
});

// Route: Voice Order Page
app.get('/voice-order', (req, res) => {
    res.send(`
    <html>
      <body>
        <h1>Place Your Order by Voice at Lasgidi Store</h1>
        <button id="voiceButton">
          <img src="https://img.icons8.com/ios-filled/50/000000/microphone.png" alt="mic icon" />
          Speak Your Order
        </button>
        <div id="order"></div>
        <script>
          const voiceButton = document.getElementById('voiceButton');
          const orderDiv = document.getElementById('order');
          
          voiceButton.addEventListener('click', () => {
            const recognition = new (window.SpeechRecognition || window.webkitSpeechRecognition)();
            recognition.lang = 'en-US';
            recognition.start();

            recognition.onresult = function(event) {
              const spokenOrder = event.results[0][0].transcript;
              orderDiv.innerHTML = "<h2>You said: " + spokenOrder + "</h2><button id='addToCart'>Add to Cart</button>";

              const addToCartButton = document.getElementById('addToCart');
              addToCartButton.addEventListener('click', () => {
                alert('Order added to cart: ' + spokenOrder);
              });
            };

            recognition.onerror = function(event) {
              orderDiv.innerHTML = '<p>Error occurred: ' + event.error + '</p>';
            };
          });
        </script>
      </body>
    </html>
    `);
});

app.listen(port, () => {
    console.log(`Lasgidi store API running on http://localhost:${port}`);
});
