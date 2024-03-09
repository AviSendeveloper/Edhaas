const Router = require("express").Router();
const NotificationController = require("../Controllers/Module/NotificationController");

Router.get("/read/:notificationId", NotificationController.readNotification);
Router.get("/list", NotificationController.getNotificationList);

module.exports = Router;
