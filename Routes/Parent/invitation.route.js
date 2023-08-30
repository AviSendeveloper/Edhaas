const Router = require("express").Router();
const InvitationController = require("../../Controllers/Parent/InvitationController");

Router.post("/send", InvitationController.send);
Router.get("/list", InvitationController.list);
Router.post("/accept", InvitationController.accept);
Router.get("/reject", InvitationController.reject);

module.exports = Router;
