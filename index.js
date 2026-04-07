const express = require("express");
const cors = require("cors");
const userData = require('./data.json')
const { connectMongoDB } = require("./connect");


const app = express();

app.use(cors());
app.use(express.json());

connectMongoDB("mongodb://127.0.0.1:27017/practise")
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.log("MongoDB error:", err));


  const userRoutes = require("./routes/user");
app.use("/api", userRoutes);



const PORT = 5000;

app.listen(PORT, () =>
  console.log(`Server Started at PORT : ${PORT}`)
);