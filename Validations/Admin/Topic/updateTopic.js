const { body } = require("express-validator");
const Topic = require("../../../Models/Topic");
const Subject = require("../../../Models/Subject");
const { error } = require("winston");

module.exports = [
    body("topicId", "topic id not found").custom(async (bId) => {
        const isTopicExist = await Topic.findOne({ _id: bId });
        if (!isTopicExist) throw new Error("topic does not exist");
        return true;
    }),
    body("name", "Name should not be empty").trim().notEmpty(),
    body("subjectId", "should not be empty")
        .notEmpty()
        .custom(async (subId) => {
            const isSubjectExist = await Subject.findOne({ _id: subId });
            if (!isSubjectExist) throw new Error("Subject not found");
            return true;
        }),
];
