const express = require("express");
const dotenv = require("dotenv").config();
const cors = require("cors");
const imagesRouter = require("./routers/images")
const routeNotFoundMiddleware = require("./middlewares/routeNotFound")
const errorsFormatterMiddleware = require("./middlewares/errorsFormatter")
const authRouter = require("./routers/auth")
const categoriesRouter = require("./routers/categories")
const messagesRouter = require("./routers/messages")

const app = express();

app.use(express.json());

app.use(cors());

app.use(express.static("public"));

app.use("/images", imagesRouter);
app.use("/categories", categoriesRouter);
app.use("/messages", messagesRouter);

app.use("", authRouter);

app.use(errorsFormatterMiddleware);

app.use(routeNotFoundMiddleware);


app.listen(process.env.PORT || 3000, () => {
    console.log(`App listening on port http://localhost:${process.env.PORT || 3000}`)
})