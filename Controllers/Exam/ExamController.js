const examService = require("../../Services/exam.service");
const questionService = require("../../Services/question.service");
const userService = require("../../Services/user.service");
const Board = require("../../Models/Board");
const Standard = require("../../Models/Standard");
const Subject = require("../../Models/Subject");
const Topic = require("../../Models/Topic");
const AgeGroup = require("../../Models/AgeGroup");
const QuestionWeightage = require("../../Models/QuestionWeightage");

const getRandomQuestion = async ({
    examType,
    boardId,
    standardId,
    subjectId,
    topicId,
    ageGroupId,
    difficultyLevel,
    exam = null,
    examId = null,
}) => {
    const examDetails =
        examId === null ? exam : await examService.examDetails(examId);

    const usedQuestionIds = examDetails.questionAnswers.map((quesAns) => {
        return quesAns.questionId;
    });

    const skipedQuestions = [
        ...usedQuestionIds,
        ...examDetails.rejectedQuestions,
    ];

    const selectedQuestions = await questionService.questionListForExam({
        examType,
        boardId,
        standardId,
        subjectId,
        topicId,
        ageGroupId,
        difficultyLevel,
        skipedQuestions,
    });

    return selectedQuestions;
};

exports.initiateExam = async (req, res) => {
    try {
        const {
            title,
            description,
            startTime,
            endTime,
            totalQuestionNumber,
            cutoffMarks,
            totalMarks,
        } = req.body;

        const intiatedExamDetails = await examService.initiateExam({
            user: req.user,
            title,
            description,
            startTime,
            endTime,
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
        console.log(error);
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
        console.log(error);
        return res.json({
            status: false,
            msg: "something went wrong",
        });
    }
};

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

        let updatedQuestion = await examService.updateSelectReject({
            examId,
            questionId,
            isSelected,
        });

        let nextQuestion = {};
        if (updatedQuestion.length !== updatedQuestion.totalQuestionNumber) {
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
            updatedQuestion = await examService.updateExamComplete(
                examId,
                true
            );
            isExamSetCompleted = true;
        }

        return res.json({
            status: true,
            msg: `question successfully ${
                isSelected ? "selected" : "rejected"
            } ${isExamSetCompleted ? "and exam set completed" : ""}`,
            nextQuestion: !isExamSetCompleted ? nextQuestion : {},
        });
    } catch (error) {
        console.log(error);
        return res.json({
            status: false,
            msg: `something went wrong`,
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
        if (!checkParentStudentRelation) {
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
        console.log(error);
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
