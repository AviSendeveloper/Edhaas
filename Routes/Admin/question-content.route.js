const Router = require("express").Router();
const QuestionContentController = require("../../Controllers/Admin/QuestionContentController");

Router.post("/create", QuestionContentController.create);
Router.get("/edit", ParentManagementController.edit);
Router.post("/update", QuestionContentController.update);

module.exports = Router;
