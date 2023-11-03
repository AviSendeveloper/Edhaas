const { Schema, model } = require("mongoose");

const rewardSchema = new Schema(
    {
        name: {
            type: String,
            unique: true,
            required: true,
        },
        image: {
            type: String,
            default: null,
            trim: true,
        },
        userId: {
            type: Schema.Types.ObjectId,
        },
    },
    {
        timestamps: true,
    }
);

rewardSchema.virtual("id").get(function () {
    return this._id.toHexString();
});

rewardSchema.set("toJSON", {
    virtuals: true,
    transform: function (doc, ret) {
        delete ret._id;
    },
});

module.exports = model("reward", rewardSchema);
