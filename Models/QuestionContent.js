const { Schema, model } = require("mongoose");

const questionContentSchema = new Schema(
    {
        question: {
            type: String,
            required: true,
        },
        options: {
            1: String,
            2: String,
            3: String,
            4: String,
        },
        correctOption: {
            type: Number,
            required: true,
        },
        creatorId: {
            type: Schema.Types.ObjectId,
            ref: "User",
            required: true,
        },
        updatorId: {
            type: Schema.Types.ObjectId,
            ref: "User",
        },
        isPublic: {
            type: Boolean,
            default: true,
        },
        totalClicked: {
            type: Number,
            default: 0,
        },
        meta: {
            examType: String,
            boardId: {
                type: Schema.Types.ObjectId,
                ref: "Board",
            },
            standardId: {
                type: Schema.Types.ObjectId,
                ref: "Standard",
            },
            subjectId: {
                type: Schema.Types.ObjectId,
                ref: "Subject",
            },
            topicId: {
                type: Schema.Types.ObjectId,
                ref: "Topic",
            },
            ageGroupId: {
                type: Schema.Types.ObjectId,
                ref: "age_groups",
            },
            difficultyLevel: {
                type: String,
            },
        },
        status: {
            type: Boolean,
            default: true,
        },
    },
    { timestamps: true }
);

module.exports = model(
    "question_content",
    questionContentSchema,
    "questionContent"
);
