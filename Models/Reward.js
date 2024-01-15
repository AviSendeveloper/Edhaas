const { Schema, model } = require("mongoose");

const rewardSchema = new Schema(
    {
        name: {
            type: String,
            required: true,
        },
        imageUrl: {
            type: String,
            default: "",
            trim: true,
            get: function (image) {
                return process.env.BASE_URL + image;
            },
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
    getters: true,
    setters: true,
    transform: function (doc, ret) {
        delete ret._id;
    },
});

module.exports = model("reward", rewardSchema);
