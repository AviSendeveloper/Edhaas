const { Schema, model } = require("mongoose");

const userSchema = new Schema(
    {
        name: {
            type: String,
            required: true,
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
    },
    {
        timestamps: true,
    }
);

module.exports = model("User", userSchema);
