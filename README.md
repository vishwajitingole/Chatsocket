<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>ChatSocket Example Application</title>
</head>
<body>
<h1>ChatSocket Example Application</h1>
<h2>Description:</h2>
<p>This repository contains a simple chat application built using Express.js for the server-side implementation and React.js for the client-side interface. It utilizes the Socket.IO library to enable real-time communication between clients and the server via WebSockets.</p>
<h2>Server Side:</h2>
<h3>Dependencies:</h3>
<ul>
  <li>express: Web framework for Node.js.</li>
  <li>http: HTTP server module for Node.js.</li>
  <li>socket.io: Real-time bidirectional event-based communication library.</li>
  <li>body-parser: Middleware for parsing incoming request bodies.</li>
  <li>cors: Middleware for enabling CORS (Cross-Origin Resource Sharing).</li>
  <li>dotenv: Loads environment variables from a .env file into process.env.</li>
  <li>mongoose: MongoDB object modeling tool designed to work in an asynchronous environment.</li>
</ul>
<h3>Routes:</h3>
<ul>
  <li>/: Home route indicating the server is up and running.</li>
  <li>/api/v1: Authentication routes for user registration and login.</li>
</ul>
<h3>WebSocket Handling:</h3>
<ul>
  <li>Establishes a WebSocket connection using Socket.IO.</li>
  <li>Listens for incoming "message" events from clients and broadcasts them to all connected clients.</li>
  <li>Handles client disconnection events.</li>
</ul>
<h2>Client Side:</h2>
<h3>Dependencies:</h3>
<ul>
  <li>socket.io-client: Client-side implementation of Socket.IO for establishing WebSocket connections.</li>
</ul>
<h3>Chat Component:</h3>
<ul>
  <li>React component responsible for rendering the chat interface.</li>
  <li>Establishes a WebSocket connection to the server upon component mounting.</li>
  <li>Listens for incoming "message" events and updates the UI with received messages.</li>
  <li>Sends user-entered messages to the server upon submission.</li>
</ul>
<h2>Usage:</h2>
<h3>Server Setup:</h3>
<ul>
  <li>Install dependencies: npm install</li>
  <li>Start the server: npm run dev</li>
  <li>Server will run on port specified in .env file or default to port 3001.</li>
</ul>
<h3>Client Setup:</h3>
<ul>
  <li>Install dependencies: npm install</li>
  <li>Start the client application: npm run dev</li>
  <li>Access the chat interface in your web browser at <a href="http://localhost:3000">http://localhost:3000</a>.</li>
</ul>
<h2>Contributing:</h2>
<p>Contributions to this project are welcome! Feel free to open issues or pull requests for any improvements or fixes you'd like to see.</p>
<h2>License:</h2>
<p>This project is licensed under the MIT License. See the LICENSE file for more information.</p>
<h2>Authors:</h2>
<ul>
  <li>Vishwajit Ingole</li>
</ul>
<h2>Acknowledgments:</h2>
<p>Special thanks to the developers of Express.js, Socket.IO, and React.js for their excellent tools and documentation.</p>
<p>© 2024 Your Company. All rights reserved.</p>
</body>
</html>
