const QuestionContent = require("../../Models/QuestionContent");
const questionContentService = require("../../Services/question.service");
const {
    routeLoger: logger,
    internalErrorLoger: errorLogger,
} = require("../../Config/WinstonLogger");

exports.allList = async (req, res) => {
    try {
        const allQuestionList = await questionContentService.allQuestionList();

        return res.json({
            status: true,
            data: allQuestionList,
        });
    } catch (error) {
        errorLogger.error(error);
        return res.json({
            status: false,
            msg: "Something went wrong",
        });
    }
};

exports.list = async (req, res) => {
    try {
        const questionList = await questionContentService.questionList(
            req.user._id
        );

        return res.json({
            status: true,
            data: questionList,
        });
    } catch (error) {
        errorLogger.error(error);
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
        errorLogger.error(error);
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
        errorLogger.error(error);
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
        errorLogger.error(error);
        return res.json({
            status: false,
            msg: "Something went wrong",
        });
    }
};
