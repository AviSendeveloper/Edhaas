const Router = require("express").Router();
const StudentManagementController = require("../../../Controllers/Admin/Management/StudentController");

Router.get("/list", StudentManagementController.getList);
Router.get("/details/:studentId", StudentManagementController.getDetails);
Router.get("/edit/:studentId", StudentManagementController.getEditDetails);
Router.post("/update", StudentManagementController.update);
Router.delete("/delete/:studentId", StudentManagementController.deleteStudent);

module.exports = Router;
