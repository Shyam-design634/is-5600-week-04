const express = require('express');
const path = require('path');
const api = require('./api'); // Import route handlers from api.js
const middleware = require('./middleware');

// Set up the app and port
const app = express();
const port = process.env.PORT || 3000;

// Use the CORS middleware
app.use(middleware.cors);

// Serve static files from the public directory
app.use(express.static(path.join(__dirname, 'public')));

// Use the modularized route handlers
app.get('/', api.handleRoot);
app.get('/products', api.listProducts);

// New route to fetch a single product by ID
app.get('/products/:id', api.getProduct);

// 404 middleware
app.use(middleware.notFound);

// Error-handling middleware
app.use(middleware.handleError);

// Start the server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});