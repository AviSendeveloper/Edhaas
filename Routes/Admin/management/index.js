const Router = require("express").Router();
const ParentMangementRoutes = require("./parent.route");
const StudentMangementRoutes = require("./student.route");
const CreatorMangementRoutes = require("./creator.route");

Router.use("/parent", ParentMangementRoutes);
Router.use("/student", StudentMangementRoutes);
Router.use("/creator", CreatorMangementRoutes);

module.exports = Router;
