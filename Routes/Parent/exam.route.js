const Router = require("express").Router();
const ExamController = require("../../Controllers/Exam/ExamController");

// Router.post("/initiate", ExamController.initiateExam);
// Router.post("/get-question", ExamController.getExamQuestions);
// Router.post("/select-reject-question", ExamController.selectRejectQuestion);
// Router.post(
//     "/assigning-deassigning-student",
//     ExamController.assignDeassignStudent
// );
Router.post("/create", ExamController.createExam);

Router.get("/list", ExamController.examList);

Router.get("/get-board", ExamController.getBoard);
Router.get("/get-standard", ExamController.getStandard);
Router.get("/get-subject", ExamController.getSubject);
Router.get("/get-topic", ExamController.getTopic);
Router.get("/get-age-group", ExamController.getAgeGroup);

module.exports = Router;
