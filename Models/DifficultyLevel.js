const { Schema, model } = require("mongoose");

const difficultyLevelSchema = new Schema(
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

difficultyLevelSchema.virtual("id").get(function () {
    return this._id.toHexString();
});

difficultyLevelSchema.set("toJSON", {
    virtuals: true,
    transform: function (doc, ret) {
        delete ret._id;
    },
});

module.exports = model("Board", difficultyLevelSchema);
