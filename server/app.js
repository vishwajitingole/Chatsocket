const express = require("express");
require("dotenv").config();
const db = require("./util/db");
const cors = require("cors");

db();

const app = express();
const bodyParser = require("body-parser");
app.use(bodyParser.json({ extended: true }));
app.use(bodyParser.urlencoded({ extended: true }));

app.use(cors());
app.get("/", (req, res) => {
  res.send("Server toh thik thaak hai aap boliye");
});

const authRoutes = require("./routes/auth");

app.use("/api/v1", authRoutes);

const http = require("http");
const server = http.createServer(app);
// Iska matlab hai ki hum Express app ko HTTP server ke
// sath attach kar rahe hain, jisse ki Express ke functions HTTP server
//ke requests aur responses ke sath integrate ho jaate hain.
// Yeh kyun zaroori hai? Kyunki Socket.IO bhi ek aise library hai jo HTTP
// server ke saath kaam karti hai. Isliye, jab hum Socket.IO ko
// Express ke saath integrate karte hain, toh humein Express app
// ko pehle se hi HTTP server ke sath connect karna hota hai, aur uske
// baad Socket.IO ko attach karna hota hai. Isi liye hum Express app ko
//http.createServer() ke andar pass karte hain.
// Use the ws library to create WebSocket server
const WebSocket = require("ws");
const wss = new WebSocket.Server({ server });

wss.on("connection", (ws) => {
  console.log("User connected");

  ws.on("message", (message) => {
    console.log(`Received message: ${message}`);
    // You can handle the incoming message here
    // For example, broadcast it to other clients
    wss.clients.forEach((client) => {
      if (client !== ws && client.readyState === WebSocket.OPEN) {
        client.send(message);
      }
    });
  });

  ws.on("close", () => {
    console.log("User disconnected");
  });
});

server.listen(process.env.PORT, () => {
  console.log(`Server running at http://localhost:${process.env.PORT}`);
});
