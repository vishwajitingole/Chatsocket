const mongoose = require("mongoose");
const User = require("../model/User");

async function connect() {
  try {
    const URI = process.env.MONGOURI;
    const mdb = await mongoose.connect(URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("Connected to the DB");
  } catch (error) {
    console.log(error + "Error connecting the db");
  }
}
module.exports = connect;
