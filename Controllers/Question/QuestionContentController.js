const QuestionContent = require("../../Models/QuestionContent");
const questionContentService = require("../../Services/question.service");

exports.list = async (req, res) => {
    try {
        const questionList = await questionContentService.questionList();

        return res.json({
            status: true,
            data: questionList,
        });
    } catch (error) {
        console.error(error);
        return res.json({
            status: false,
            msg: "Something went wrong",
        });
    }
};

exports.create = async (req, res) => {
    try {
        const {
            question,
            options,
            correctOption,
            examType,
            boardId,
            standardId,
            subjectId,
            topicId,
            ageGroupId,
            difficultyLevel,
        } = req.body;

        const insertedQuestion = await questionContentService.createQuestion({
            question,
            options,
            correctOption,
            examType,
            boardId,
            standardId,
            subjectId,
            topicId,
            ageGroupId,
            difficultyLevel,
            user: req.user,
        });

        return res.json({
            status: true,
            data: insertedQuestion,
            msg: "Question created successfully",
        });
    } catch (error) {
        console.error(error);
        return res.json({
            status: false,
            msg: "Something went wrong",
        });
    }
};

exports.details = async (req, res) => {
    try {
        const { questionId } = req.params;

        const questionDetails = await questionContentService.getQuestionDetails(
            {
                questionId,
            }
        );

        return res.json({
            status: true,
            data: questionDetails,
        });
    } catch (error) {
        console.error(error);
        return res.json({
            status: false,
            msg: "Something went wrong",
        });
    }
};

exports.update = async (req, res) => {
    try {
        const {
            questionId,
            question,
            options,
            correctOption,
            examType,
            boardId,
            standardId,
            subjectId,
            topicId,
            ageGroupId,
            difficultyLevel,
        } = req.body;

        const updatedQuestion = await questionContentService.updateQuestion({
            questionId,
            question,
            options,
            correctOption,
            examType,
            boardId,
            standardId,
            subjectId,
            topicId,
            ageGroupId,
            difficultyLevel,
            user: req.user,
        });

        return res.json({
            status: true,
            data: updatedQuestion,
            msg: "Question updated successfully",
        });
    } catch (error) {
        console.error(error);
        return res.json({
            status: false,
            msg: "Something went wrong",
        });
    }
};
