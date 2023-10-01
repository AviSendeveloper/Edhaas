const { body } = require("express-validator");
const Subject = require("../../../Models/Subject");
const { error } = require("winston");

module.exports = [
    body("subjectId", "subject id not found").custom(async (bId) => {
        const isSubjectExist = await Subject.findOne({ _id: bId });
        if (!isSubjectExist) throw new Error("subject does not exist");
        return true;
    }),
    body("name", "Name should not be empty").trim().notEmpty(),
];
