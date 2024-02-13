const examService = require("../../Services/exam.service");

exports.examList = async (req, res) => {
    const userId = req.user._id;

    const examList = await examService.listForStudent(userId);

    return res.status(200).json({
        status: true,
        data: examList,
    });
};

exports.examDetails = async (req, res) => {
    const examId = req.params.examId;

    const examDetails = await examService.examDetailsForStudent(examId);

    return res.status(200).json({
        status: 200,
        data: examDetails,
    });
};

exports.submitExam = async (req, res) => {
    const { examId, answers, submittedTime } = req.body;

    const exam = await examService.questionOfExam(examId);

    if (!exam) {
        return res.status(400).json({
            status: 400,
            message: "Exam not found",
        });
    }

    if (exam.attendStatus) {
        return res.status(403).json({
            status: false,
            message: "Already submitted",
        });
    }

    if (
        new Date(exam.timeDetails.end).getTime() <
        new Date(submittedTime).getTime()
    ) {
        return res.status(403).json({
            status: false,
            message: "Time for submission expired",
        });
    }

    // get exam questions
    const examQuestions = exam.questionAnswers;

    // Filter and check questions
    // create updatedQuestionAnswers to update questionAnswers field in exam collection
    let totalMarks = 0;
    const updatedQuestionAnswers = examQuestions.map((question) => {
        if (answers[question.questionId._id]) {
            question.questionId.correctOption ===
            answers[question.questionId._id]
                ? totalMarks++
                : totalMarks;

            return {
                questionId: question.questionId._id,
                givenAnswer: answers[question.questionId._id],
                markAchive:
                    question.questionId.correctOption ===
                    answers[question.questionId._id]
                        ? 1
                        : 0,
            };
        } else {
            return {
                questionId: question.questionId._id,
            };
        }
    });

    // update exam collection
    const updatedExam = await examService.updateExamForStudent({
        examId: examId,
        updatedQuestionAnswers: updatedQuestionAnswers,
        totalMarks: totalMarks,
        passStatus: totalMarks >= exam.cutoffMarks ? true : false,
        attendStatus: true,
    });

    return res.json({
        examQuestions: examQuestions,
        updatedQuestionAnswers: updatedQuestionAnswers,
        updatedExam: updatedExam,
    });
};
