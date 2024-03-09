const Router = require("express").Router();
const AuthRoute = require("./auth.route");
const ForgetResetPasswordRoute = require("./forget-reset-password.route");
const ApplicationRoute = require("./application.route");
const NotificationRoute = require("./notification.route");
const ParentRoute = require("./Parent");
const StudentRoute = require("./Student");
const AdminRoutes = require("./Admin");
const CreatorRoutes = require("./Creator");
const isAuth = require("../Middlewares/isAuth.middleware");
const isAdmin = require("../Middlewares/isAdmin.middleware");
const isParent = require("../Middlewares/isParent.middleware");
const isStudent = require("../Middlewares/isStudent.middleware");
const isCreator = require("../Middlewares/isCreator.middleware");
const {
    routeLoger: logger,
    internalErrorLoger: errorLogger,
} = require("../Config/WinstonLogger");

Router.get("/", (req, res, next) => {
    logger.info("Anything");
    logger.info("CI/CD testing");
    logger.info("CI/CD again testing");
    return res.json({
        status: true,
        data: null,
    });
});
Router.get("/hello", isAuth, isAdmin, (req, res, next) => {
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
Router.use("/api", AuthRoute);
Router.use("/api", ForgetResetPasswordRoute);
Router.use("/api/application", ApplicationRoute);
Router.use("/api/parent", isAuth, isParent, ParentRoute);
Router.use("/api/student", isAuth, isStudent, StudentRoute);
Router.use("/api/admin", isAuth, isAdmin, AdminRoutes);
Router.use("/api/creator", isAuth, isCreator, CreatorRoutes);
Router.use("/api/notification", isAuth, NotificationRoute);

// url not found route
Router.use("/", (req, res) => {
    return res.json({
        status: false,
        msg: `${req.url} url not found`,
    });
});

// error middleware in route
Router.use((error, req, res, next) => {
    errorLogger.error(error);
    return res.json({
        status: false,
        msg: error.message,
    });
});

module.exports = Router;
