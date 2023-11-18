const Router = require("express").Router();
const CreatorManagementController = require("../../../Controllers/Admin/Management/CreeatorController");

Router.get("/list", CreatorManagementController.getList);
Router.get("/details/:creatorId", CreatorManagementController.getDetails);
Router.post("/update", CreatorManagementController.update);
Router.delete("/delete/:creatorId", CreatorManagementController.deleteCreator);

module.exports = Router;
