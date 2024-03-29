const QuestionContent = require("../Models/QuestionContent");
const { ObjectId } = require("mongodb");

exports.allQuestionList = async ({
    role,
    creatorId,
    examType,
    ageGroupId,
    subjectId,
    difficultyLevel,
    limit,
    skip,
}) => {
    try {
        const matchConditionArr = [];
        let matchQuery = {};
        const filterConditionArr = [];
        let filterQuery = {};

        // match query
        if (role !== "" && role !== undefined)
            matchConditionArr.push({ "creatorId.role": role });
        if (creatorId !== "" && creatorId !== undefined)
            matchConditionArr.push({
                "creatorId._id": new ObjectId(creatorId),
            });

        if (matchConditionArr.length > 1) {
            matchQuery.$or = matchConditionArr;
        } else {
            matchQuery = matchConditionArr[0];
        }

        // filter query
        if (examType) filterConditionArr.push({ "meta.examType": examType });
        if (ageGroupId)
            filterConditionArr.push({
                "meta.ageGroupId": new ObjectId(ageGroupId),
            });
        if (subjectId)
            filterConditionArr.push({
                "meta.subjectId": new ObjectId(subjectId),
            });
        if (difficultyLevel)
            filterConditionArr.push({
                "meta.difficultyLevel": difficultyLevel,
            });

        if (filterConditionArr.length > 1) {
            filterQuery.$or = filterConditionArr;
        } else {
            filterQuery = filterConditionArr[0];
        }

        const queryAggregationStages = [
            // lookup/relationship creatorId field with users collection
            {
                $lookup: {
                    from: "users",
                    localField: "creatorId",
                    foreignField: "_id",
                    as: "creatorId",
                },
            },
            {
                $unwind: { path: "$creatorId" },
            },
            // match by creatorId and role
            {
                $match: {
                    ...matchQuery,
                },
            },
            // match by other filter/parameter
            {
                $match: { ...filterQuery },
            },
        ];

        const questionCount = await QuestionContent.aggregate([
            ...queryAggregationStages,
            {
                $count: "questionCount",
            },
        ]);

        const questionList = await QuestionContent.aggregate([
            ...queryAggregationStages,
            // lookup/relationship all fields
            {
                $lookup: {
                    from: "boards",
                    localField: "meta.boardId",
                    foreignField: "_id",
                    as: "meta.boardId",
                },
            },
            {
                $unwind: {
                    path: "$meta.boardId",
                    preserveNullAndEmptyArrays: true,
                },
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
                $unwind: {
                    path: "$meta.standardId",
                    preserveNullAndEmptyArrays: true,
                },
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
                $unwind: {
                    path: "$meta.subjectId",
                    preserveNullAndEmptyArrays: true,
                },
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
                $unwind: {
                    path: "$meta.topicId",
                    preserveNullAndEmptyArrays: true,
                },
            },
            {
                $lookup: {
                    from: "ageGroup",
                    localField: "meta.ageGroupId",
                    foreignField: "_id",
                    as: "meta.ageGroupId",
                },
            },
            {
                $unwind: {
                    path: "$meta.ageGroupId",
                    preserveNullAndEmptyArrays: true,
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
                    createdAt: 1,
                },
            },
            {
                $skip: skip,
            },
            {
                $limit: +limit,
            },
        ]);

        return [questionList, questionCount[0].questionCount];
    } catch (error) {
        console.log(error);
        console.error(error.message);
        throw error;
    }
};

exports.questionList = async (userId, { limit, skip }) => {
    const questionList = await QuestionContent.find({ creatorId: userId })
        .skip(skip)
        .limit(limit)
        .populate({ path: "meta.boardId", select: "name" })
        .populate({ path: "meta.standardId", select: "name" })
        .populate({ path: "meta.subjectId", select: "name" })
        .populate({ path: "meta.topicId", select: "name" })
        .populate({ path: "meta.ageGroupId", select: "name" })
        .populate({ path: "meta.ageGroupId", select: "startAge endAge" });

    return questionList;
};

exports.questionCount = async ({ creatorId = null }) => {
    let query = {};
    if (!creatorId) {
        query = {};
    } else {
        query = { creatorId: creatorId };
    }

    const questionCount = await QuestionContent.countDocuments(query);
    return questionCount;
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
        updatorId: userId,
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

exports.questionListForExam = async ({ exam, usedQuestionIds }) => {
    let questions = [];
    const { type, board, standard, subject, topic, ageGroup, difficultyLevel } =
        exam.info;

    if (type === "academic") {
        questions = await exports.academicQuestionList({
            type,
            board,
            standard,
            subject,
            topic,
            difficultyLevel,
            usedQuestionIds,
            totalQuestionNumber: exam.totalQuestionNumber,
        });
    } else if (type === "emotional_quotient" || type === "social_behaviour") {
        questions = await exports.emotionalOrSocialQuestionList({
            type,
            ageGroup,
            difficultyLevel,
            usedQuestionIds,
            totalQuestionNumber: exam.totalQuestionNumber,
        });
    }

    return questions;
};

exports.academicQuestionList = async ({
    type,
    board,
    standard,
    subject,
    topic,
    difficultyLevel,
    usedQuestionIds,
    totalQuestionNumber,
}) => {
    const questions = await QuestionContent.aggregate([
        // $match
        {
            $match: {
                _id: { $nin: usedQuestionIds },
                "meta.examType": type,
                "meta.boardId": new ObjectId(board.toString()),
                "meta.standardId": new ObjectId(standard.toString()),
                "meta.subjectId": new ObjectId(subject.toString()),
                "meta.topicId": new ObjectId(topic.toString()),
                "meta.difficultyLevel": difficultyLevel,
                isPublic: true,
            },
        },
        // select random using $sample
        {
            $sample: {
                size: totalQuestionNumber,
            },
        },
    ]);

    return questions;
};

exports.emotionalOrSocialQuestionList = async ({
    type,
    ageGroup,
    difficultyLevel,
    usedQuestionIds,
    totalQuestionNumber,
}) => {
    const questions = await QuestionContent.aggregate([
        // $match
        {
            $match: {
                _id: { $nin: usedQuestionIds },
                "meta.examType": type,
                "meta.ageGroupId": new ObjectId(ageGroup.toString()),
                "meta.difficultyLevel": difficultyLevel,
                isPublic: true,
            },
        },
        // select random using $sample
        {
            $sample: {
                size: totalQuestionNumber,
            },
        },
    ]);

    return questions;
};

exports.updateClickMultiQuestions = async ({ questionIds, value = 1 }) => {
    try {
        await QuestionContent.updateMany(
            { _id: { $in: questionIds } },
            { $inc: { totalClicked: value } }
        );
        return true;
    } catch (error) {
        return false;
    }
};

exports.totalQuestionClicked = async ({ creatorId }) => {
    let query = {};
    if (!creatorId) {
        query = {};
    } else {
        query = { creatorId: new ObjectId(creatorId) };
    }

    const totalQuestionClicked = await QuestionContent.aggregate([
        {
            $match: {
                ...query,
            },
        },
        {
            $group: {
                _id: null,
                totalClicked: { $sum: "$totalClicked" },
            },
        },
    ]);
    console.log(totalQuestionClicked);
    return totalQuestionClicked;
};
