const Router = require("express").Router();
const QuestionContentRoutes = require("./question-content.route");

// Question
Router.use("/question-content", QuestionContentRoutes);

module.exports = Router;
