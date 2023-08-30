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
        imageUrl: {
            type: String,
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
        invitaion: {
            sent: [
                {
                    user_id: Schema.Types.ObjectId,
                    requestDate: Date,
                    status: {
                        type: String,
                        enum: ["pending", "approved", "rejected"],
                        default: "pending",
                    },
                },
            ],
            recieved: [
                {
                    user_id: Schema.Types.ObjectId,
                    requestDate: Date,
                    status: {
                        type: String,
                        enum: ["pending", "approved"],
                        default: "pending",
                    },
                },
            ],
        },
    },
    {
        timestamps: true,
    }
);

module.exports = model("User", userSchema);
