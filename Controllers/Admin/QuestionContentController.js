const QuestionContent = require("../../Models/QuestionContent");

exports.list = async (req, res) => {
    const questionList = await QuestionContent.find({})
        .populate({ path: "meta.boardId", select: "name" })
        .populate({ path: "meta.standardId", select: "name" })
        .populate({ path: "meta.subjectId", select: "name" })
        .populate({ path: "meta.topicId", select: "name" })
        .populate({ path: "meta.ageGroupId", select: "name" })
        .populate({ path: "meta.ageGroupId", select: "startAge endAge" });

    return res.json({
        status: true,
        data: questionList,
    });
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

        const { _id: userId, role } = req.user;

        const insertedQuestion = await QuestionContent.create({
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
            data: null,
            msg: "Something went wrong",
        });
    }
};

exports.details = async (req, res) => {
    const { questionId } = req.params;

    const questionDetails = await QuestionContent.findOne({
        _id: questionId,
    })
        .populate({ path: "meta.boardId", select: "name" })
        .populate({ path: "meta.standardId", select: "name" })
        .populate({ path: "meta.subjectId", select: "name" })
        .populate({ path: "meta.topicId", select: "name" })
        .populate({ path: "meta.ageGroupId", select: "name" })
        .populate({ path: "meta.ageGroupId", select: "startAge endAge" });

    return res.json({
        status: true,
        data: questionDetails,
    });
};

exports.update = (req, res) => {
    return res.json({
        status: true,
        data: null,
    });
};
