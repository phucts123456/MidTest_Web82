const express = require("express");
const connectDb = require("./database/database");
const app = express();
const router = require('./routers');
connectDb();
app.use(express.json());
app.use(router);
app.listen("8080", () => {
    console.log("server is running");
})