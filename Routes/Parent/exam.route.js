const Router = require("express").Router();
const ExamController = require("../../Controllers/Exam/ExamController");

Router.post("/initiate", ExamController.initiateExam);
Router.get("/get-question", ExamController.examList);

module.exports = Router;
