const Router = require("express").Router();
const QuestionContentController = require("../../Controllers/Question/QuestionContentController");
const validator = require("../../Validations/Validator");
const {
    validateQuestionContent,
    isQuestionIdExist,
} = require("../../Validations/QuestionContent");
const isAllowUpdateQuestion = require("../../Middlewares/isAllowUpdateQuestion.middleware");

Router.get("/list", QuestionContentController.list);
Router.post(
    "/create",
    validateQuestionContent,
    validator,
    QuestionContentController.create
);
Router.get("/details/:questionId", QuestionContentController.details);
Router.post(
    "/update",
    isQuestionIdExist,
    validateQuestionContent,
    validator,
    isAllowUpdateQuestion,
    QuestionContentController.update
);

module.exports = Router;
