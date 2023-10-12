const { Schema, model } = require("mongoose");

const examSchema = new Schema(
    {
        info: {
            title: String,
            description: String,
        },
        creatorId: {
            type: Schema.Types.ObjectId,
            ref: "User",
        },
        assignTo: [
            {
                type: Schema.Types.ObjectId,
                ref: "User",
            },
        ],
        timeDetails: {
            start: Date,
            end: Date,
            allotedTime: String,
        },
        questionAnswers: [
            {
                questionContentId: {
                    type: Schema.Types.ObjectId,
                    ref: "QuestionContent",
                },
                givenAnswer: Number,
                markAchive: String,
            },
        ],
        totalQuestionNo: Number,
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
        awardId: [
            {
                type: Schema.Types.ObjectId,
                // ref: "User",
            },
        ],
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
