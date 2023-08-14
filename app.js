const express = require("express");
const expressWinston = require("express-winston");
require("dotenv").config();
const connectDb = require("./Config/Database");
const {
    routeLoger: logger,
    internalErrorLoger: errorLogger,
} = require("./Config/WinstonLogger");
const AuthRoute = require("./Routes/auth.route");

const app = express();

app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(
    expressWinston.logger({
        winstonInstance: logger,
        statusLevels: true,
    })
);

// Routes
app.get("/", (req, res, next) => {
    logger.info("Anything");
    logger.info("Anything 2");
    return res.json({
        status: true,
        data: null,
    });
});
app.get("/hello", (req, res, next) => {
    try {
        logger.info("Hello anything");
        throw new Error("Testing");
        return res.json({
            status: true,
            data: "hello",
        });
    } catch (error) {
        errorLogger.error(error);
        return res.json({
            status: false,
            data: error.message,
        });
    }
});
app.use(AuthRoute);

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
