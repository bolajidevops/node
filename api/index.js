// index.js

const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const port = 3000;

app.use(bodyParser.json());

// Mock data for the store
const products = [
    { id: 1, name: 'Smartphone', price: 599 },
    { id: 2, name: 'Laptop', price: 899 },
    { id: 3, name: 'Headphones', price: 199 }
];

let orders = [];

// Route: Get list of products
app.get('/products', (req, res) => {
    res.json({ store: "Lasgidi", products: products });
});

// Route: Create a new order
app.post('/orders', (req, res) => {
    const { productId, quantity } = req.body;
    const product = products.find(p => p.id === productId);

    if (!product) {
        return res.status(404).json({ error: 'Product not found' });
    }

    const order = {
        id: orders.length + 1,
        product: product.name,
        quantity: quantity,
        total: product.price * quantity
    };

    orders.push(order);
    res.json({ message: 'Order created', order });
});

// Placeholder for voice ordering feature
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
