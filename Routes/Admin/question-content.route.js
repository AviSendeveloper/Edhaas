const Router = require("express").Router();
const QuestionContentController = require("../../Controllers/Question/QuestionContentController");
const validator = require("../../Validations/Validator");
const {
    validateQuestionContent,
    isQuestionIdExist,
    validateQuestionListParams,
} = require("../../Validations/QuestionContent");
const isAllowUpdateQuestion = require("../../Middlewares/isAllowUpdateQuestion.middleware");

Router.get(
    "/all-list",
    validateQuestionListParams,
    validator,
    QuestionContentController.allList
);
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
Router.post("/get-openai-questions", QuestionContentController.getOpenAIQuestions);

module.exports = Router;
