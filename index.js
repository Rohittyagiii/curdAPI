const express = require("express");
const { connectMongoDB } = require("./connect");

const app = express();

app.use(express.json());

connectMongoDB("mongodb://127.0.0.1:27017/practise")
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.log("MongoDB error:", err));


  const userRoutes = require("./routes/user");
app.use("/api/users", userRoutes);



const PORT = 5000;

app.listen(PORT, () =>
  console.log(`Server Started at PORT : ${PORT}`)
);