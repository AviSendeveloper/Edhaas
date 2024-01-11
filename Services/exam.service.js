const Exam = require("../Models/Exam");
const {
    routeLoger: logger,
    internalErrorLoger: errorLogger,
} = require("../Config/WinstonLogger");

exports.createExam = async ({
    user,
    studentId,
    examType,
    difficultyLevel,
    boardId,
    standardId,
    subjectId,
    topicId,
    title,
    description,
    startTime,
    duration,
    totalQuestionNumber,
    questionWeightage,
    cutoffMarks,
}) => {
    try {
        const endTime = new Date(
            new Date(startTime).getTime() + duration * 60 * 1000
        );
        const intiatedExamDetails = await Exam.create({
            title: title,
            description: description,
            info: {
                type: examType,
                difficultyLevel: difficultyLevel,
                subject: subjectId,
                board: boardId,
                standard: standardId,
                topic: topicId,
                ageGroup: null,
            },
            creatorId: user._id,
            assignTo: studentId,
            timeDetails: {
                start: startTime,
                duration: duration,
                end: endTime,
            },
            totalQuestionNumber: totalQuestionNumber,
            questionWeightage: questionWeightage,
            totalMarks: totalQuestionNumber * questionWeightage,
            cutoffMarks: cutoffMarks,
        });

        return intiatedExamDetails;
    } catch (error) {
        errorLogger.error(error);
        throw error;
    }
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

exports.addQuestionsToExam = async ({ examId, questions }) => {
    const updatedExam = await Exam.findByIdAndUpdate(
        examId,
        {
            $push: {
                questionAnswers: questions,
            },
        },
        {
            new: true,
        }
    );

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

exports.updateExamComplete = async (examId, status = true) => {
    const updatedExam = await Exam.findByIdAndUpdate(examId, {
        isExamSetCompleted: status,
    });

    return updatedExam;
};
