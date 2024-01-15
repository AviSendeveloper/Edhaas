const express = require("express");
const cors = require("cors");
const expressWinston = require("express-winston");
require("dotenv").config();
const connectDb = require("./Config/Database");
const {
    routeLoger: logger,
    internalErrorLoger: errorLogger,
} = require("./Config/WinstonLogger");
const routes = require("./Routes");

const app = express();

app.use(
    cors({
        origin: "*",
        methods: ["GET", "POST", "DELETE", "UPDATE", "PUT", "PATCH"],
    })
);
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(express.static("public"));
app.use(
    expressWinston.logger({
        winstonInstance: logger,
        statusLevels: true,
    })
);

// Routes
app.use(routes);

// Eror logger
app.use(
    expressWinston.errorLogger({
        winstonInstance: errorLogger,
    })
);

// Server listen
const port = process.env.PORT || 3000;
(async () => {
    try {
        await connectDb();
        app.listen(port, () => console.log(`server is running at ${port}`));
    } catch (error) {
        console.log(`Running error: ${error}`);
    }
})();
