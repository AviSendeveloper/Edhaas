const examService = require("../../Services/exam.service");
const questionService = require("../../Services/question.service");
const userService = require("../../Services/user.service");
const Board = require("../../Models/Board");
const Standard = require("../../Models/Standard");
const Subject = require("../../Models/Subject");
const Topic = require("../../Models/Topic");
const AgeGroup = require("../../Models/AgeGroup");
const QuestionWeightage = require("../../Models/QuestionWeightage");
const {
    routeLoger: logger,
    internalErrorLoger: errorLogger,
} = require("../../Config/WinstonLogger");
const { default: mongoose } = require("mongoose");

exports.createExam = async (req, res) => {
    try {
        let exam;
        let selectedQuestions;
        let isError = false;
        const {
            examType,
            difficultyLevel,
            studentId,
            subjectId,
            topicId,
            title,
            description,
            startTime,
            duration,
            totalQuestionNumber,
            cutoffMarks,
        } = req.body;

        const checkParentStudentRelation =
            await userService.checkParentStudentRelation({
                parentId: req.user._id,
                studentId: studentId,
            });
        if (!checkParentStudentRelation.status)
            throw new Error("student not belong to you");

        // session = await mongoose.startSession();
        try {
            // session.startTransaction();
            exam = await examService.createExam({
                user: req.user,
                studentId,
                examType,
                difficultyLevel,
                boardId: checkParentStudentRelation.studentDetails.board,
                standardId: checkParentStudentRelation.studentDetails.standard,
                ageGroupId: checkParentStudentRelation.studentDetails.ageGroup,
                subjectId,
                topicId,
                title,
                description,
                startTime,
                duration,
                totalQuestionNumber,
                questionWeightage: QuestionWeightage,
                cutoffMarks,
            });

            // Generate questions for exam
            selectedQuestions = await getRandomQuestion(exam);

            // check selected questions is equal to total question requested
            if (selectedQuestions.length != totalQuestionNumber) {
                isError = true;
                throw new Error("not enough questions");
            }

            // Add questions to exam
            exam = await examService.addQuestionsToExam({
                examId: exam._id,
                questions: selectedQuestions,
            });

            // await session.commitTransaction();
        } catch (error) {
            // await session.abortTransaction();
            if (isError) {
                await examService.delete(exam._id);
            }
            throw error;
        } finally {
            // await session.endSession();
            // console.log("session ended");
        }

        /**
         * assign point to question creator for selecting questions
         * need to add cod
         */
        // selectedQuestions.forEach(async (question) => {
        //     const questionCreator = await User.findById(question.creatorId);
        //     if (questionCreator) {
        //         questionCreator.points += 1; // Increase the points of the question creator by 1
        //         await questionCreator.save();
        //     }
        // });

        return res.status(201).send({
            status: true,
            msg: "Exam created successfully",
            questions: selectedQuestions,
        });
    } catch (error) {
        errorLogger.error(error);
        return res.status(500).send({
            status: false,
            msg: error.message,
        });
    }
};

exports.assignReward = async (req, res) => {
    try {
        const { examId, rewardId } = req.body;

        const assignReward = await examService.assignReward({
            examId,
            rewardId,
        });

        return res.json({
            status: true,
            msg: "Reward assigned successfully",
        });
    } catch (error) {
        errorLogger.error(error);
        return res.status(500).send({
            status: false,
            msg: error.message,
        });
    }
};

exports.setCompleted = async (req, res) => {
    try {
        const { examId } = req.body;
        const setCompleted = await examService.setCompleted({ examId });
        if (!setCompleted) throw new Error("failed to set completed");
        return res.json({
            status: true,
            msg: "Exam set completed successfully",
        });
    } catch (error) {
        errorLogger.error(error);
        return res.status(500).send({
            status: false,
            msg: error.message,
        });
    }
};

const getRandomQuestion = async (exam) => {
    const usedQuestionIds = await userService.getUsedQuestions(exam.assignTo);

    const selectedQuestions = await questionService.questionListForExam({
        exam,
        usedQuestionIds,
    });

    return selectedQuestions;
};

exports.initiateExam = async (req, res) => {
    try {
        const {
            title,
            description,
            startTime,
            duration,
            totalQuestionNumber,
            cutoffMarks,
            totalMarks,
        } = req.body;

        const intiatedExamDetails = await examService.initiateExam({
            user: req.user,
            title,
            description,
            startTime,
            duration,
            questionWeightage: QuestionWeightage,
            totalQuestionNumber,
            cutoffMarks,
            totalMarks,
        });

        return res.json({
            status: true,
            data: intiatedExamDetails,
            msg: "Exam created successfully",
        });
    } catch (error) {
        errorLogger.error(error);
        return res.json({
            status: false,
            msg: "something went wrong",
        });
    }
};

exports.getExamQuestions = async (req, res) => {
    try {
        const {
            examId,
            examType,
            boardId,
            standardId,
            subjectId,
            topicId,
            ageGroupId,
            difficultyLevel,
        } = req.body;

        const exam = await examService.examDetails(examId);

        if (exam.isExamSetCompleted) {
            return res.json({
                status: false,
                msg: "Exam set Already completed",
            });
        }

        const selectedQuestions = await getRandomQuestion({
            examType,
            boardId,
            standardId,
            subjectId,
            topicId,
            ageGroupId,
            difficultyLevel,
            exam,
        });

        return res.json({
            status: true,
            data: selectedQuestions,
        });
    } catch (error) {
        errorLogger.error(error);
        return res.json({
            status: false,
            msg: "something went wrong",
        });
    }
};

/**
 * Selects or rejects a question for an exam and returns the next question or marks the exam as complete.
 * @param {*} req - The request object.
 * @param {*} res - The response object.
 */
exports.selectRejectQuestion = async (req, res) => {
    try {
        let isExamSetCompleted = false;

        const {
            examId,
            examType,
            boardId,
            standardId,
            subjectId,
            topicId,
            ageGroupId,
            difficultyLevel,
            questionId,
            isSelected = true,
        } = req.body;

        // Update the selected/rejected status of the question
        let updatedQuestion = await examService.updateSelectReject({
            examId,
            questionId,
            isSelected,
        });

        let nextQuestion = {};

        // Check if there are more questions remaining in the exam
        if (updatedQuestion.length !== updatedQuestion.totalQuestionNumber) {
            // Get a random question for the exam
            nextQuestion = await getRandomQuestion({
                examType,
                boardId,
                standardId,
                subjectId,
                topicId,
                ageGroupId,
                difficultyLevel,
                examId,
            });
        } else {
            // Mark the exam as complete
            updatedQuestion = await examService.updateExamComplete(
                examId,
                true
            );
            isExamSetCompleted = true;
        }

        return res.json({
            status: true,
            msg: `Question successfully ${
                isSelected ? "selected" : "rejected"
            } ${isExamSetCompleted ? "and exam set completed" : ""}`,
            nextQuestion: !isExamSetCompleted ? nextQuestion : {},
        });
    } catch (error) {
        errorLogger.error(error);
        return res.json({
            status: false,
            msg: `Something went wrong`,
        });
    }
};

exports.assignDeassignStudent = async (req, res) => {
    try {
        const { examId, studentId, isAssigning = true } = req.body;

        const checkParentStudentRelation =
            await userService.checkParentStudentRelation({
                parentId: req.user._id,
                studentId: studentId,
            });
        if (!checkParentStudentRelation.status) {
            return res.json({
                status: false,
                msg: "student not belong to you",
            });
        }

        const updateExam = await examService.updateStudentAssigning({
            examId,
            studentId,
            isAssigning,
        });

        if (!updateExam) {
            return res.json({
                status: false,
                msg: "student already assigned",
            });
        }

        return res.json({
            status: true,
            msg: `student successfully ${
                isAssigning ? "assigned" : "deassigned"
            }`,
        });
    } catch (error) {
        errorLogger.error(error);
        return res.json({
            status: false,
            msg: `something went wrong`,
        });
    }
};

exports.examList = async (req, res) => {
    try {
        const userId = req.user._id;
        const exams = await examService.list(userId);

        return res.json({
            status: true,
            data: exams,
        });
    } catch (error) {
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
