const QuestionContent = require("../Models/QuestionContent");
const { ObjectId } = require("mongodb");

exports.allQuestionList = async (role = null) => {
    try {
        let matchQuery = {};
        if (role !== null) {
            matchQuery = {
                "creatorId.role": role,
            };
        }

        const questionList = await QuestionContent.aggregate([
            // lookup/relationship all fields
            {
                $lookup: {
                    from: "users",
                    localField: "creatorId",
                    foreignField: "_id",
                    as: "creatorId",
                },
            },
            {
                $unwind: "$creatorId",
            },
            {
                $lookup: {
                    from: "boards",
                    localField: "meta.boardId",
                    foreignField: "_id",
                    as: "meta.boardId",
                },
            },
            {
                $unwind: "$meta.boardId",
            },
            {
                $lookup: {
                    from: "standards",
                    localField: "meta.standardId",
                    foreignField: "_id",
                    as: "meta.standardId",
                },
            },
            {
                $unwind: "$meta.standardId",
            },
            {
                $lookup: {
                    from: "subjects",
                    localField: "meta.subjectId",
                    foreignField: "_id",
                    as: "meta.subjectId",
                },
            },
            {
                $unwind: "$meta.subjectId",
            },
            {
                $lookup: {
                    from: "topics",
                    localField: "meta.topicId",
                    foreignField: "_id",
                    as: "meta.topicId",
                },
            },
            {
                $unwind: "$meta.topicId",
            },
            {
                $lookup: {
                    from: "agegroups",
                    localField: "meta.ageGroupId",
                    foreignField: "_id",
                    as: "meta.ageGroupId",
                },
            },
            {
                $unwind: "$meta.ageGroupId",
            },
            // match stage
            {
                $match: {
                    // "creatorId.role": role,
                    ...matchQuery,
                },
            },
            // project/select fields
            {
                $project: {
                    _id: 1,
                    question: 1,
                    options: 1,
                    correctOption: 1,
                    isPublic: 1,
                    totalClicked: 1,
                    creatorId: {
                        _id: 1,
                        name: 1,
                        role: 1,
                    },
                    meta: {
                        examType: 1,
                        boardId: { _id: 1, name: 1 },
                        standardId: { _id: 1, name: 1 },
                        subjectId: { _id: 1, name: 1 },
                        topicId: { _id: 1, name: 1 },
                        ageGroupId: { _id: 1, startAge: 1, endAge: 1 },
                        difficultyLevel: 1,
                    },
                    status: 1,
                },
            },
            {
                $limit: 1,
            },
        ]);

        return questionList;
    } catch (error) {
        console.error(error.message);
        throw error;
    }
};

exports.questionList = async (userId) => {
    const questionList = await QuestionContent.find({ creatorId: userId })
        .populate({ path: "meta.boardId", select: "name" })
        .populate({ path: "meta.standardId", select: "name" })
        .populate({ path: "meta.subjectId", select: "name" })
        .populate({ path: "meta.topicId", select: "name" })
        .populate({ path: "meta.ageGroupId", select: "name" })
        .populate({ path: "meta.ageGroupId", select: "startAge endAge" });

    return questionList;
};

exports.createQuestion = async ({
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
    user,
}) => {
    const { _id: userId, role } = user;

    const updatedContent = {
        question: question,
        options: {
            1: options["1"],
            2: options["2"],
            3: options["3"],
            4: options["4"],
        },
        correctOption: correctOption,
        creatorId: userId,
        isPublic: role == "admin" || role == "creator" ? true : false,
        totalClicked: 0,
        meta: {
            examType: examType,
            boardId: boardId,
            standardId: standardId,
            subjectId: subjectId,
            topicId: topicId,
            ageGroupId: ageGroupId,
            difficultyLevel: difficultyLevel,
        },
    };

    const updatedQuestion = await QuestionContent.create({ ...updatedContent });

    return updatedQuestion;
};

exports.getQuestionDetails = async ({ questionId }) => {
    const questionDetails = await QuestionContent.findOne({
        _id: questionId,
    })
        .populate({ path: "meta.boardId", select: "name" })
        .populate({ path: "meta.standardId", select: "name" })
        .populate({ path: "meta.subjectId", select: "name" })
        .populate({ path: "meta.topicId", select: "name" })
        .populate({ path: "meta.ageGroupId", select: "name" })
        .populate({ path: "meta.ageGroupId", select: "startAge endAge" });

    return questionDetails;
};

exports.updateQuestion = async ({
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
    user,
}) => {
    const { _id: userId, role } = user;

    const updatedContent = {
        question: question,
        options: {
            1: options["1"],
            2: options["2"],
            3: options["3"],
            4: options["4"],
        },
        correctOption: correctOption,
        creatorId: userId,
        isPublic: role == "admin" || role == "creator" ? true : false,
        totalClicked: 0,
        meta: {
            examType: examType,
            boardId: boardId,
            standardId: standardId,
            subjectId: subjectId,
            topicId: topicId,
            ageGroupId: ageGroupId,
            difficultyLevel: difficultyLevel,
        },
    };

    const updatedQuestion = await QuestionContent.findByIdAndUpdate(
        {
            _id: questionId,
        },
        { ...updatedContent },
        { new: true }
    );

    return updatedQuestion;
};

exports.questionListForExam = async ({
    examType,
    boardId,
    standardId,
    subjectId,
    topicId,
    ageGroupId,
    difficultyLevel,
    skipedQuestions,
}) => {
    const questions = await QuestionContent.aggregate([
        // $match
        {
            $match: {
                _id: { $nin: skipedQuestions },
                "meta.examType": examType,
                "meta.boardId": new ObjectId(boardId),
                "meta.standardId": new ObjectId(standardId),
                "meta.subjectId": new ObjectId(subjectId),
                "meta.topicId": new ObjectId(topicId),
                "meta.ageGroupId": new ObjectId(ageGroupId),
                "meta.difficultyLevel": difficultyLevel,
                isPublic: true,
            },
        },
        // select random using $sample
        {
            $sample: {
                size: 1,
            },
        },
    ]);

    return questions;
};
