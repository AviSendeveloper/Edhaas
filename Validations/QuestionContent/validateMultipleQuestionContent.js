const { body, check } = require("express-validator");
const Board = require("../../Models/Board");
const Standard = require("../../Models/Standard");
const Subject = require("../../Models/Subject");
const Topic = require("../../Models/Topic");
const AgeGroup = require("../../Models/AgeGroup");
const DifficultyLevel = require("../../Models/DifficultyLevel");
const ExamType = require("../../Models/ExamType");

const checkField = async (model, fieldValue, targetField = "_id") => {
    try {
        const isDataExist = await model.findOne({ [targetField]: fieldValue });
        if (!isDataExist) return false;
        return true;
    } catch (error) {
        return false;
    }
};

module.exports = [
    body("examType", "exam type require").custom(async (type, { req }) => {
        if (!ExamType.includes(type)) {
            throw new Error("Invalid exam type");
        }

        if (type == "academic") {
            const { boardId, standardId, subjectId, topicId } = req.body;

            if (!boardId || !standardId || !subjectId || !topicId)
                throw new Error(
                    "boardId, standardId, subjectId and topicId are required"
                );

            // Board
            if (!(await checkField(Board, boardId)))
                throw new Error("Invalid board Id");

            // Standard
            if (!(await checkField(Standard, standardId)))
                throw new Error("Invalid standard Id");

            // Subject
            if (!(await checkField(Subject, subjectId)))
                throw new Error("Invalid subject Id");

            // Topic
            if (!(await checkField(Topic, topicId)))
                throw new Error("Invalid topic Id");
        } else {
            // Define validation chain for non-academic type
            const { ageGroupId } = req.body;

            // AgeGroup
            if (!(await checkField(AgeGroup, ageGroupId)))
                throw new Error("Invalid age group Id");
        }

        return true;
    }),
    body("difficultyLevel")
        .trim()
        .exists()
        .custom((diffcultyLevel) => {
            if (!DifficultyLevel.includes(diffcultyLevel)) {
                throw new Error("Invalid difficulty level");
            }
            return true;
        }),
    body("questions.*.question").trim().not().isEmpty(),
    body("questions.*.options").custom((options) => {
        if (Object.entries(options).length !== 4)
            throw new Error("4 option are require");
        return true;
    }),
    body("questions.*.correctOption").trim().not().isEmpty(),
];
