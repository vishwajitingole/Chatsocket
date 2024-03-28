const express = require("express");
const http = require("http");
const { Server } = require("socket.io"); // Import Server from socket.io
const bodyParser = require("body-parser");
const cors = require("cors");
require("dotenv").config();
const db = require("./util/db");
const authRoutes = require("./routes/auth");

db();

const app = express();

app.use(cors());
app.use(bodyParser.json({ extended: true }));
app.use(bodyParser.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.send("Server is up and running!");
});

app.use("/api/v1", authRoutes);

const server = http.createServer(app); // Create HTTP server instance

// Attach socket.io to the server
const io = new Server(server, {
  cors: {
    origin: "*", // Allow requests from any origin, you should adjust this in production
  },
});

io.on("connection", (socket) => {
  console.log("A client connected");

  socket.emit("hello", "Hello from server");

  socket.on("howdy", (arg) => {
    console.log(arg);
  });

  socket.on("disconnect", () => {
    console.log("A client disconnected");
  });
});

const PORT = process.env.PORT || 3001;
server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
