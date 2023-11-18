const Router = require("express").Router();
const ParentManagementController = require("../../../Controllers/Admin/Management/ParentController");

Router.get("/list", ParentManagementController.getList);
Router.get("/details/:parentId", ParentManagementController.getDetails);
Router.get("/edit/:parentId", ParentManagementController.getEditDetails);
Router.post("/update", ParentManagementController.update);
Router.delete("/delete/:parentId", ParentManagementController.deleteParent);

module.exports = Router;
