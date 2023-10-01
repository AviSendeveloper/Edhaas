const { body } = require("express-validator");
const Subject = require("../../../Models/Subject");
const { error } = require("winston");

module.exports = [
    body("name", "Name should not be empty")
        .trim()
        .isString()
        .custom(async (subject) => {
            const subjectCount = await Subject.find({ name: subject }).count();
            if (subjectCount > 0) throw new Error(`${subject} already exist`);
            return true;
        }),
];
