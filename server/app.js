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

const server = http.createServer(app);

// Attach socket.io to the server
//yaa fir hum chahe toh isse different port pe bhi run kar sakte hai
const io = new Server(server, {
  cors: {
    origin: "*",
  },
});

io.on("connection", (socket) => {
  console.log("A client connected");

  socket.emit("hello", "Hello from server" + socket.id);

  socket.on("howdy", (arg) => {
    console.log(arg);
  });
  // Ye Listener hai
  socket.on("message", (message) => {
    console.log("Received message:", message);
    // Broadcast se kya hota wo data yaa message khudke alawa sabko bhej deta hai
    socket.broadcast.emit("message", message);
  });

  socket.on("disconnect", () => {
    console.log("A client disconnected");
  });
});

const PORT = process.env.PORT || 3001;
server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
