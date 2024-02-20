const { query } = require("express-validator");
const examTypes = require("../../Models/ExamType");
const difficultyLevels = require("../../Models/DifficultyLevel");
const roles = ["admin", "creator"];

module.exports = [
    query("role")
        .optional()
        .custom((role) => {
            if (!roles.includes(role)) throw new Error("Invalid role");
            return true;
        }),
    query("creatorId").optional().isMongoId().withMessage("Invalid creatorId"),
    query("boardId").optional().isMongoId().withMessage("Invalid boardId"),
    query("standardId")
        .optional()
        .isMongoId()
        .withMessage("Invalid standardId"),
    query("subjectId").optional().isMongoId().withMessage("Invalid subjectId"),
    query("topicId").optional().isMongoId().withMessage("Invalid topicId"),
    query("ageGroupId")
        .optional()
        .isMongoId()
        .withMessage("Invalid ageGroupId"),
    query("examType")
        .optional()
        .custom((examType) => {
            if (!examTypes.includes(examType))
                throw new Error("Invalid examType");
            return true;
        }),
    query("difficultyLevel")
        .optional()
        .custom((difficultyLevel) => {
            if (!difficultyLevels.includes(difficultyLevel))
                throw new Error("Invalid difficultyLevel");
            return true;
        }),
];
