const express = require("express");
const dotenv = require("dotenv");
const mongoose = require("mongoose");
const cors = require("cors");
const app = express();
dotenv.config();
app.use(express.json());
app.use(
  cors({
    origin: "*",
  })
);
const clientRoutes = require("./Routes/clientRoutes");
const connect_db = async () => {
  try {
    const connect = await mongoose.connect(process.env.DATABASE);
    console.log("connected to mongo db");
  } catch (error) {
    console.log("error connecting to database", error.message);
  }
};
connect_db();
app.use("/", clientRoutes);
app.get("/", (req, res) => {
  res.send("Hello blackcoffer");
});
const PORT = process.env.PORT || 5000;

app.listen(PORT, console.log("server is running"));
