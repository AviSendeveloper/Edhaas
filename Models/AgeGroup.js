const { Schema, model } = require("mongoose");

const ageGroupSchema = new Schema(
    {
        startAge: {
            type: String,
            required: true,
        },
        endAge: {
            type: String,
            required: true,
        },
        userId: {
            type: Schema.Types.ObjectId,
        },
    },
    {
        timestamps: true,
    }
);

ageGroupSchema.virtual("id").get(function () {
    return this._id.toHexString();
});

ageGroupSchema.set("toJSON", {
    virtuals: true,
    transform: function (doc, ret) {
        delete ret._id;
    },
});

module.exports = model("AgeGroup", ageGroupSchema);
