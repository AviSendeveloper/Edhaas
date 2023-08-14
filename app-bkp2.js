const express = require("express");
require("dotenv").config();
const connectDB = require("./Config/database");

const app = express();

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

// Route
app.get("/", (req, res, next) => {
    return res.json({
        status: 200,
        data: "Hello",
    });
});

const port = process.env.PORT || 3000;
(() => {
    connectDB().then((res) => {
        console.log("database connected");
        app.listen(port, () => {
            console.log(`server listen at port ${port}`);
        });
    });
})();
