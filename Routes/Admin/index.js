const Router = require("express").Router();
const ParentMangementRoutes = require("./parentManagement.route");
const StudentMangementRoutes = require("./studentManagement.route");
const BoardRoutes = require("./board.route");
const StandradRoutes = require("./standard.route");

Router.use("/manegement/parent", ParentMangementRoutes);
Router.use("/manegement/student", StudentMangementRoutes);
Router.use("/board", BoardRoutes);
Router.use("/standard", StandradRoutes);

module.exports = Router;
