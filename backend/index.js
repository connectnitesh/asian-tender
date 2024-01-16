const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const tenderRoutes = require('./src/routes/tender')
const cors = require('cors')

//express app
const app = express();

//cors enable
app.use(cors());

dotenv.config();

//middleware to parse json content
app.use(express.json());

//middleware to parse body from url
app.use(
  express.urlencoded({
    extended: false,
  })
);

//connect to db
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log("Connected to Database Successfully");
  })
  .catch((e) => {
    console.log("Error: ", e);
  });

//tender routes
app.use('/api', tenderRoutes);

const PORT = process.env.PORT;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
