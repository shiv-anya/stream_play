const express = require("express");
const cors = require("cors");
require("dotenv").config();

const authRoutes = require("./routes/auth");

const app = express();
const PORT = process.env.PORT || 3001;

app.use(cors());
app.use(express.json());
app.use(express.urlencoded());

app.get("/", (req, res) => {
  res.send("Hi there!");
});

app.use("/auth", authRoutes);

app.listen(PORT, () => {
  console.log(`Server running on ${PORT}`);
});
