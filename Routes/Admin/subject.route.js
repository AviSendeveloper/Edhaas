const Router = require("express").Router();
const SubjectController = require("../../Controllers/Admin/SubjectController");
const validator = require("../../Validations/Validator");
const { createSubject, updateSubject } = require("../../Validations/Admin");

Router.get("/list", SubjectController.list);
Router.post("/create", createSubject, validator, SubjectController.create);
Router.get("/edit/:subjectId", SubjectController.edit);
Router.post("/update", updateSubject, validator, SubjectController.update);
Router.delete("/delete/:subjectId", SubjectController.delete);

module.exports = Router;
