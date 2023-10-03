const { Schema, model } = require("mongoose");

const userSchema = new Schema(
    {
        name: {
            type: String,
            unique: true,
            required: true,
        },
        userId: {
            type: Schema.Types.ObjectId,
        },
        subjectId: {
            type: Schema.Types.ObjectId,
            ref: "subjects",
        },
    },
    {
        timestamps: true,
    }
);

module.exports = model("Subject", userSchema);
