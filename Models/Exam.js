const { Schema, model } = require("mongoose");
const examType = require("../Models/ExamType");
const difficultyLevel = require("../Models/DifficultyLevel");

const examSchema = new Schema(
    {
        title: String,
        description: String,
        info: {
            type: {
                type: String,
                enum: examType,
            },
            difficultyLevel: {
                type: String,
                enum: difficultyLevel,
            },
            board: {
                type: Schema.Types.ObjectId,
                ref: "Board",
            },
            standard: {
                type: Schema.Types.ObjectId,
                ref: "Standard",
            },
            ageGroup: {
                type: Schema.Types.ObjectId,
                ref: "AgeGroup",
            },
            subject: {
                type: Schema.Types.ObjectId,
                ref: "Subject",
            },
            topic: {
                type: Schema.Types.ObjectId,
                ref: "Topic",
            },
        },
        creatorId: {
            type: Schema.Types.ObjectId,
            ref: "User",
        },
        assignTo: {
            type: Schema.Types.ObjectId,
            ref: "User",
        },
        timeDetails: {
            start: Date,
            end: Date,
            duration: Number,
        },
        questionAnswers: [
            {
                questionId: {
                    type: Schema.Types.ObjectId,
                    ref: "QuestionContent",
                },
                givenAnswer: Number,
                markAchive: String,
            },
        ],
        totalQuestionNumber: Number,
        questionWeightage: {
            type: Number,
            default: 1,
        },
        totalMarks: {
            type: String,
            default: 0,
        },
        cutoffMarks: {
            type: String,
            default: 0,
        },
        totalMarkAchive: {
            type: String,
            default: 0,
        },
        passStatus: {
            type: Boolean,
            default: false,
        },
        attendStatus: {
            type: Boolean,
            default: false,
        },
        rewardId: [
            {
                type: Schema.Types.ObjectId,
                ref: "Reward",
            },
        ],
        isExamSetCompleted: {
            type: Boolean,
            default: false,
        },
    },
    {
        timestamps: true,
    }
);

examSchema.virtual("id").get(function () {
    return this._id.toHexString();
});

examSchema.set("toJSON", {
    virtuals: true,
    transform: function (doc, ret) {
        delete ret._id;
    },
});

module.exports = model("Exam", examSchema);
