const { Schema, model } = require("mongoose");

const passwordResetSchema = new Schema({
    email: {
        type: String,
        unique: true,
        required: true,
        lowercase: true,
        trim: true,
    },
    token: {
        type: String,
        required: true,
    },
    isUsed: {
        type: Boolean,
        default: false,
    },
    createdAt: {
        type: Date,
        default: Date.now(),
    },
    expiredAt: Date,
});

passwordResetSchema.virtual("id").get(function () {
    return this._id.toHexString();
});

passwordResetSchema.set("toJSON", {
    virtuals: true,
    transform: function (doc, ret) {
        delete ret._id;
    },
});

module.exports = model("PasswordReset", passwordResetSchema);
