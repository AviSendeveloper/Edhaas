const QuestionContent = require("../../Models/QuestionContent");

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

exports.edit = (req, res) => {
    return res.json({
        status: true,
        data: null,
    });
};

exports.update = (req, res) => {
    return res.json({
        status: true,
        data: null,
    });
};
