const { Schema, model } = require("mongoose");
const path = require("path");
require("dotenv").config();

const userSchema = new Schema(
    {
        firstName: {
            type: String,
            required: true,
        },
        lastName: {
            type: String,
        },
        email: {
            type: String,
            required: true,
            trim: true,
            lowercase: true,
        },
        password: {
            type: String,
            required: true,
        },
        phoneNumber: {
            type: String,
        },
        board: {
            type: Schema.Types.ObjectId,
            ref: "Board",
        },
        standard: {
            type: Schema.Types.ObjectId,
            ref: "Standard",
        },
        ageGroup: {
            type: Schema.Types.ObjectId,
            ref: "AgeGroup",
        },
        imageUrl: {
            type: String,
            default: "",
            get: function (image) {
                return path.join(process.env.BASE_URL, image);
            },
        },
        role: {
            type: String,
            enum: ["admin", "creator", "student", "parent"],
        },
        parents: [
            {
                parentId: { type: Schema.Types.ObjectId },
                joinedAt: Date,
            },
        ],
        status: {
            type: Boolean,
            required: true,
        },
        invitation: [
            {
                senderId: {
                    type: Schema.Types.ObjectId,
                    ref: "User",
                },
                requestDate: Date,
                status: {
                    type: String,
                    enum: ["pending", "accepted", "rejected"],
                    default: "pending",
                },
            },
        ],
        usedQuestions: [
            {
                type: Schema.Types.ObjectId,
                ref: "QuestionContent",
            },
        ],
    },
    {
        timestamps: true,
    }
);

userSchema.virtual("id").get(function () {
    return this._id.toHexString();
});

userSchema.set("toJSON", {
    virtuals: true,
    getters: true,
    setters: true,
    transform: function (doc, ret) {
        delete ret._id;
    },
});

module.exports = model("User", userSchema);
