const examService = require("../../Services/exam.service");
const questionService = require("../../Services/question.service");

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

        const intiatedExamDetails = await examService.initiateExam({
            user: req.user,
            title,
            description,
            startTime,
            endTime,
            questionWeightage,
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

        const usedQuestionIds = exam.questionAnswers.map((quesAns) => {
            return quesAns.questionId;
        });

        const skipedQuestions = [...usedQuestionIds, ...exam.rejectedQuestions];

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
        const { examId, questionId, isSelected = true } = req.body;

        const updatedQuestion = await examService.updateSelectReject({
            examId,
            questionId,
            isSelected,
        });

        return res.json({
            status: true,
            msg: `question successfully ${
                isSelected ? "selected" : "rejected"
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
