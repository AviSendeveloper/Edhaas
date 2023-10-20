const Exam = require("../Models/Exam");

exports.initiateExam = async ({
    user,
    title,
    description,
    startTime,
    endTime,
    questionWeightage,
    totalQuestionNumber,
    cutoffMarks,
    totalMarks,
}) => {
    const intiatedExamDetails = await Exam.create({
        info: {
            title: title,
            description: description,
        },
        creatorId: user._id,
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

    return intiatedExamDetails;
};

exports.examDetails = async (examId) => {
    const details = await Exam.findOne({ _id: examId });
    return details;
};

exports.updateSelectReject = async ({ examId, questionId, isSelected }) => {
    let updatedExam = {};
    if (isSelected) {
        updatedExam = await Exam.findByIdAndUpdate(
            examId,
            {
                $push: {
                    questionAnswers: {
                        questionId,
                    },
                },
            },
            {
                new: true,
            }
        );
    } else {
        updatedExam = await Exam.findByIdAndUpdate(
            examId,
            {
                $push: {
                    rejectedQuestions: questionId,
                },
            },
            {
                new: true,
            }
        );
    }

    return updatedExam;
};
