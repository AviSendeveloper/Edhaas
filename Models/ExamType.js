const { Schema, model } = require("mongoose");

const examTypeSchema = new Schema(
    {
        name: {
            type: String,
            unique: true,
            required: true,
        },
    },
    {
        timestamps: true,
    }
);

examTypeSchema.virtual("id").get(function () {
    return this._id.toHexString();
});

examTypeSchema.set("toJSON", {
    virtuals: true,
    transform: function (doc, ret) {
        delete ret._id;
    },
});

module.exports = model("ExamType", examTypeSchema);
