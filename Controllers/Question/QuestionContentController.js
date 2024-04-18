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
const OpenAI = require("openai");

exports.allList = async (req, res) => {
    try {
        const {
            creatorId,
            role,
            examType,
            ageGroupId,
            subjectId,
            difficultyLevel,
            row = 10,
            page = 1,
        } = req.query;
        // console.log(limit, page);

        const limit = row;
        const skip = (page - 1) * limit;

        const [questionList, questionCount] =
            await questionContentService.allQuestionList({
                creatorId,
                role,
                examType,
                ageGroupId,
                subjectId,
                difficultyLevel,
                limit,
                skip,
            });

        const pagination = {
            total: questionCount,
            row,
            page,
        };

        return res.json({
            status: true,
            pagination: pagination,
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

exports.list = async (req, res) => {
    try {
        const userId = req.user._id;
        const { row = 10, page = 1 } = req.query;

        const limit = row;
        const skip = (page - 1) * limit;

        const clickedDetails =
            await questionContentService.totalQuestionClicked({
                creatorId: userId,
            });
        const totalQuestionClicked = clickedDetails[0].totalClicked;

        const totalQuestions = await questionContentService.questionCount({
            creatorId: userId,
        });

        const pagination = {
            total: totalQuestions,
            row: limit,
            page,
        };

        const questionList = await questionContentService.questionList(
            req.user._id,
            { limit, skip }
        );

        return res.json({
            status: true,
            totalQuestionClicked: totalQuestionClicked,
            paginationDetails: pagination,
            data: questionList,
        });
    } catch (error) {
        console.log(error);
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

exports.getOpenAIQuestions = async (req, res) => {
    try {
        const { prompt } = req.body;

        const openai = new OpenAI({
            apiKey: process.env.OPEN_AI_KEY,
        });
        const aiModel = process.env.OPEN_AI_MODEL;

        // messages array
        const messages = [
            {
                role: "system",
                content: prompt,
            },
        ];

        const completion = await openai.chat.completions.create({
            model: aiModel,
            response_format: { type: "json_object" },
            temperature: 1,
            max_tokens: 1000,
            top_p: 1,
            frequency_penalty: 0,
            presence_penalty: 0,
            messages,
        });

        const aiResponse = completion.choices[0].message.content;

        // parse string into valid json
        const json = JSON.parse(aiResponse);
        console.log(json);

        // return the questions json
        return res.status(200).json(json);
    } catch (error) {
        console.log(error);
        errorLogger.error(error);
        return res.status(500).json({
            status: false,
        });
    }
};
