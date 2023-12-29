const Router = require("express").Router();
const InvitationController = require("../../Controllers/Student/InvitationController");

Router.post("/send", InvitationController.send);
Router.get("/list", InvitationController.list);
Router.post("/accept", InvitationController.accept);
Router.post("/reject", InvitationController.reject);

module.exports = Router;
