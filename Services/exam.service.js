const Exam = require("../Models/Exam");

exports.initiateExam = async ({
    user,
    title,
    description,
    startTime,
    duration,
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
            duration: duration,
            end: new Date(new Date(startTime).getTime() + duration * 60 * 1000),
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

exports.updateStudentAssigning = async ({ examId, studentId, isAssigning }) => {
    let updatedExam = {};
    if (isAssigning) {
        const checkStudentExist = await Exam.findOne({
            _id: examId,
            assignTo: studentId,
        });
        console.log("checkStudentExist: ", checkStudentExist);

        if (checkStudentExist) {
            return false;
        }

        await Exam.findByIdAndUpdate(
            examId,
            {
                $push: {
                    assignTo: studentId,
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
                $pull: {
                    assignTo: studentId,
                },
            },
            {
                new: true,
            }
        );
    }

    return true;
};

exports.list = async (userId) => {
    const exams = await Exam.find({ creatorId: userId });

    return exams;
};

exports.updateExamComplete = async (examId, status) => {
    const updatedExam = await Exam.findByIdAndUpdate(examId, {
        isExamSetCompleted: status,
    });

    return updatedExam;
};
