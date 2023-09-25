const Router = require("express").Router();
const BoardController = require("../../Controllers/Admin/BoardController");
const validator = require("../../Validations/Validator");
const { createBoard, updateBoard } = require("../../Validations/Admin");

Router.get("/list", BoardController.list);
Router.post("/create", createBoard, validator, BoardController.create);
Router.get("/edit/:boardId", BoardController.edit);
// Router.post("/update", updateBoard, validator, BoardController.update);
Router.delete("/delete/:boardId", BoardController.delete);

module.exports = Router;
