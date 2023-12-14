const express = require("express");
const dotenv = require("dotenv").config();
const cors = require("cors");

const app = express();

app.use(express.json());

app.use(cors());

app.listen(process.env.PORT || 3000, () => {
    console.log(`App listening on port http://localhost:${process.env.PORT || 3000}`)
})