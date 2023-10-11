const Router = require("express").Router();
const QuestionContentController = require("../../Controllers/Admin/QuestionContentController");
const validator = require("../../Validations/Validator");
const { createUpdateQuestionContent } = require("../../Validations/Admin");

Router.get("/list", QuestionContentController.list);
Router.post(
    "/create",
    createUpdateQuestionContent,
    validator,
    QuestionContentController.create
);
Router.get("/details/:questionId", QuestionContentController.details);
Router.post("/update", QuestionContentController.update);

module.exports = Router;
