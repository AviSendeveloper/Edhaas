const Router = require("express").Router();
const ParentMangementRoutes = require("./parentManagement.route");
const StudentMangementRoutes = require("./studentManagement.route");
const BoardRoutes = require("./board.route");
const StandradRoutes = require("./standard.route");
const SubjectRoutes = require("./subject.route");
const TopicRoutes = require("./topic.route");

Router.use("/manegement/parent", ParentMangementRoutes);
Router.use("/manegement/student", StudentMangementRoutes);
Router.use("/board", BoardRoutes);
Router.use("/standard", StandradRoutes);
Router.use("/subject", SubjectRoutes);
Router.use("/topic", TopicRoutes);

module.exports = Router;
