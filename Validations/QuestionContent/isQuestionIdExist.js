const { body } = require("express-validator");
const QuestionContent = require("../../Models/QuestionContent");

module.exports = [
    body("questionId", "question id require")
        .exists()
        .custom(async (questionId) => {
            console.log("questionId");
            const isQuestionExist = await QuestionContent.findOne({
                _id: questionId,
            });

            if (!isQuestionExist) throw new Error("Invalid question id");
            return true;
        }),
];
