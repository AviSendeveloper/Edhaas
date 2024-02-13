const examRouter = require("express").Router();
const examController = require("../../Controllers/Student/ExamController");

examRouter.get("/list", examController.examList);
examRouter.get("/details/:examId", examController.examDetails);

module.exports = examRouter;
