const { body } = require("express-validator");
const Topic = require("../../../Models/Topic");
const Subject = require("../../../Models/Subject");
const { error } = require("winston");

module.exports = [
    body("name", "Name should not be empty")
        .trim()
        .isString()
        .custom(async (topic) => {
            const topicCount = await Topic.find({ name: topic }).count();
            if (topicCount > 0) throw new Error(`${topic} already exist`);
            return true;
        }),
    body("subjectId", "should not be empty")
        .notEmpty()
        .custom(async (subId) => {
            const isSubjectExist = await Subject.findOne({ _id: subId });
            if (!isSubjectExist) throw new Error("Subject not found");
            return true;
        }),
];
