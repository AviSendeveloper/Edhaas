const questionContentService = require("../../Services/question.service");
const Board = require("../../Models/Board");
const Standard = require("../../Models/Standard");
const Subject = require("../../Models/Subject");
const Topic = require("../../Models/Topic");
const AgeGroup = require("../../Models/AgeGroup");
const {
    routeLoger: logger,
    internalErrorLoger: errorLogger,
} = require("../../Config/WinstonLogger");

exports.allList = async (req, res) => {
    try {
        const role = req.query.role ? req.query.role : null;
        const allQuestionList = await questionContentService.allQuestionList(
            role
        );

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

exports.getBoard = async (req, res) => {
    try {
        const list = await Board.find({});

        return res.json({
            status: true,
            data: list,
        });
    } catch (error) {
        return res.json({
            status: true,
            msg: "Something went wrong",
        });
    }
};

exports.getStandard = async (req, res) => {
    try {
        const list = await Standard.find({});

        return res.json({
            status: true,
            data: list,
        });
    } catch (error) {
        return res.json({
            status: true,
            msg: "Something went wrong",
        });
    }
};

exports.getSubject = async (req, res) => {
    try {
        const list = await Subject.find({});

        return res.json({
            status: true,
            data: list,
        });
    } catch (error) {
        return res.json({
            status: true,
            msg: "Something went wrong",
        });
    }
};

exports.getTopic = async (req, res) => {
    try {
        const subjectId = req.query.subjectId;
        const list = await Topic.find({ subjectId: subjectId });

        return res.json({
            status: true,
            data: list,
        });
    } catch (error) {
        return res.json({
            status: true,
            msg: "Something went wrong",
        });
    }
};

exports.getAgeGroup = async (req, res) => {
    try {
        const list = await AgeGroup.find({});

        return res.json({
            status: true,
            data: list,
        });
    } catch (error) {
        return res.json({
            status: true,
            msg: "Something went wrong",
        });
    }
};
