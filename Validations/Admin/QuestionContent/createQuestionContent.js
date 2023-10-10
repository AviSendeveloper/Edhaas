const { body, check } = require("express-validator");
const Board = require("../../../Models/Board");
const Standard = require("../../../Models/Standard");
const Subject = require("../../../Models/Subject");
const Topic = require("../../../Models/Topic");
const AgeGroup = require("../../../Models/AgeGroup");
const DifficultyLevel = require("../../../Models/DifficultyLevel");

const checkField = async (model, fieldValue, targetField = "_id") => {
    try {
        const isBoardExist = await model.findOne({ [targetField]: fieldValue });
        if (!isBoardExist) return false;
        return true;
    } catch (error) {
        return false;
    }
};

module.exports = [
    body("type", "confirm password does not matched").custom(
        async (type, { req }) => {
            if (type == "academic") {
                const { boardId, standardId, subjectId, topicId } = req.body;

                if (boardId || standardId || subjectId || topicId)
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
                const { ageGroupId, difficultyLevel } = req.body;

                if (!ageGroupId || !difficultyLevel)
                    throw new Error(
                        "ageGroupId and difficultyLevel are required"
                    );

                // AgeGroup
                if (!(await checkField(AgeGroup, ageGroupId)))
                    throw new Error("Invalid age group Id");

                // AgeGroup
                if (!(await checkField(AgeGroup, ageGroupId, "name")))
                    throw new Error("Invalid difficulty level");
            }

            return true;
        }
    ),
    body("question").trim().exists(),
    body("options")
        .trim()
        .exists()
        .custom((options) => {
            if (options.length !== 4) throw new Error("4 option are require");
            return true;
        }),
    body("correctOption").trim().exists(),
];
