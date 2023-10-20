const Router = require("express").Router();
const ExamController = require("../../Controllers/Exam/ExamController");

Router.post("/initiate", ExamController.initiateExam);
Router.post("/get-question", ExamController.getExamQuestions);
Router.post("/select-reject-question", ExamController.selectRejectQuestion);

module.exports = Router;
