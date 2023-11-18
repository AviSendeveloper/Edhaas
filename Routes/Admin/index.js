const Router = require("express").Router();
const MangementRoutes = require("./management");
const BoardRoutes = require("./board.route");
const StandradRoutes = require("./standard.route");
const SubjectRoutes = require("./subject.route");
const TopicRoutes = require("./topic.route");
const AgeGroupRoutes = require("./age-group.route");
const QuestionContentRoutes = require("./question-content.route");

Router.use("/manegement/", MangementRoutes);
Router.use("/board", BoardRoutes);
Router.use("/standard", StandradRoutes);
Router.use("/subject", SubjectRoutes);
Router.use("/topic", TopicRoutes);
Router.use("/age-group", AgeGroupRoutes);

// Question
Router.use("/question-content", QuestionContentRoutes);

module.exports = Router;
