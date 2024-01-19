const Router = require("express").Router();
const ExamController = require("../../Controllers/Exam/ExamController");
const {
    createExam: createExamValidation,
    assignReward: assignRewardValidation,
    setExamComplete: setExamCompleteValidation,
} = require("../../Validations/Parent");
const validator = require("../../Validations/Validator");

// Router.post("/initiate", ExamController.initiateExam);
// Router.post("/get-question", ExamController.getExamQuestions);
// Router.post("/select-reject-question", ExamController.selectRejectQuestion);
// Router.post(
//     "/assigning-deassigning-student",
//     ExamController.assignDeassignStudent
// );
Router.post(
    "/create",
    createExamValidation,
    validator,
    ExamController.createExam
);
Router.post(
    "/assign-reward",
    assignRewardValidation,
    validator,
    ExamController.assignReward
);
// Router.post("/payment", ExamController.payment);
Router.post(
    "/set-completed",
    setExamCompleteValidation,
    validator,
    ExamController.setCompleted
);

Router.get("/list", ExamController.examList);

Router.get("/get-reward", ExamController.getReward);
Router.get("/get-board", ExamController.getBoard);
Router.get("/get-standard", ExamController.getStandard);
Router.get("/get-subject", ExamController.getSubject);
Router.get("/get-topic", ExamController.getTopic);
Router.get("/get-age-group", ExamController.getAgeGroup);

module.exports = Router;
