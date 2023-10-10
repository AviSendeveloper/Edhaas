const Router = require("express").Router();
const QuestionContentController = require("../../Controllers/Admin/QuestionContentController");
const validator = require("../../Validations/Validator");
const { createQuestionContent } = require("../../Validations/Admin");

Router.post(
    "/create",
    createQuestionContent,
    validator,
    QuestionContentController.create
);
Router.get("/edit", QuestionContentController.edit);
Router.post("/update", QuestionContentController.update);

module.exports = Router;
