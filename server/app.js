const express = require("express");
require("dotenv").config();
const db = require("./util/db");
db();
const app = express();
const bodyParser = require("body-parser");
app.use(bodyParser.json({ extended: true }));
app.use(bodyParser.urlencoded({ extended: true }));

// Import the auth routes
const authRoutes = require("./routes/auth");

// Use the auth routes at the specified path
app.use("/api/v1", authRoutes);

const { createServer } = require("http");
const { Server } = require("socket.io");
const server = createServer(app);
const io = new Server(server);
io.on("connection", (socket) => {
  console.log("a user connected");
});
server.listen(process.env.PORT, () => {
  console.log(`Server running at http://localhost:${process.env.PORT}`);
});
