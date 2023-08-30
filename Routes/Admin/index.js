const Router = require("express").Router();
const ParentMangementRoutes = require("./parentManagement.route");
const StudentMangementRoutes = require("./studentManagement.route");

Router.use("/manegement/parent", ParentMangementRoutes);
Router.use("/manegement/student", StudentMangementRoutes);

module.exports = Router;
