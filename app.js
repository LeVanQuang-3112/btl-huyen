require("dotenv/config");

const express = require("express");
const bodyParser = require("body-parser");
const db = require("./config/database");
const app = express();
const cors = require("cors");

// content-type: application/json
app.use(bodyParser.json());

// allow cors
app.use(cors());

// Routes
app.use("/api", require("./routes"));

//Error handling
app.use((error, req, res, next) => {
  console.log(error);
  const status = error.statusCode || 500;
  const message = error.message;
  const data = error.data;
  res.status(status).json({
    message: message,
    data: data,
  });
});

const PORT = process.env.PORT || 3002;

// Test DB
db.authenticate()
  .then(() => console.log("Database connected..."))
  .catch((err) => console.log(err));

app.listen(PORT, () => console.log('Database is running in port'));
