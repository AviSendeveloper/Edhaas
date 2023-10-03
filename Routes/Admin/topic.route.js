const Router = require("express").Router();
const TopicController = require("../../Controllers/Admin/TopicController");
const validator = require("../../Validations/Validator");
const { createTopic, updateTopic } = require("../../Validations/Admin");

Router.get("/list", TopicController.list);
Router.post("/create", createTopic, validator, TopicController.create);
Router.get("/edit/:topicId", TopicController.edit);
Router.post("/update", updateTopic, validator, TopicController.update);
Router.delete("/delete/:topicId", TopicController.delete);

module.exports = Router;
