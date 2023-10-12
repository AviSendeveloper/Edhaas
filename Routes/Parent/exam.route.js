const Router = require("express").Router();
const ExamController = require("../../Controllers/Exam/ExamController");

Router.post("/initiate", ExamController.initiateExam);

module.exports = Router;
