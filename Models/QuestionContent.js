const { Schema, model } = require("mongoose");

const questionContentSchema = new Schema({
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
        required: true,
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
        type: String,
        boardId: {
            type: Schema.Types.ObjectId,
            ref: "boards",
        },
        standardId: {
            type: Schema.Types.ObjectId,
            ref: "standards",
        },
        subjectId: {
            type: Schema.Types.ObjectId,
            ref: "subjects",
        },
        topicId: {
            type: Schema.Types.ObjectId,
            ref: "topics",
        },
        ageGroupId: {
            type: Schema.Types.ObjectId,
            ref: "agegroups",
        },
        deficultyLavelId: {
            type: Schema.Types.ObjectId,
            ref: "difficultylevels",
        },
    },
    status: {
        type: Boolean,
        default: false,
    },
});

module.exports = model("QuestionContent", questionContentSchema);
