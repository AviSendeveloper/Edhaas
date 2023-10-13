const Exam = require("../../Models/Exam");

exports.initiateExam = async (req, res) => {
    try {
        const {
            title,
            description,
            startTime,
            endTime,
            questionWeightage,
            totalQuestionNumber,
            cutoffMarks,
            totalMarks,
        } = req.body;

        const intiatedExamDetails = await Exam.create({
            info: {
                title: title,
                description: description,
            },
            creatorId: req.user._id,
            timeDetails: {
                start: startTime,
                end: endTime,
                allotedTime:
                    new Date(endTime).getMinutes() -
                    new Date(startTime).getMinutes(),
            },
            totalQuestionNumber: totalQuestionNumber,
            questionWeightage: questionWeightage,
            totalMarks:
                totalMarks !== undefined
                    ? totalMarks
                    : totalQuestionNumber * questionWeightage,
            cutoffMarks: cutoffMarks,
        });

        return res.json({
            status: true,
            // data: intiatedExamDetails,
            msg: "Exam created successfully",
        });
    } catch (error) {
        console.log(error);
        return res.json({
            status: true,
            msg: "something went wrong",
        });
    }
};

exports.examList = async (req, res) => {
    const {
        exmaId,
        examType,
        boardId,
        standardId,
        subjectId,
        topicId,
        ageGroupId,
        difficultyLevel,
    } = req.body;
};
