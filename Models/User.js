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
        invitation: [
            {
                senderId: {
                    type: Schema.Types.ObjectId,
                    ref: "User",
                },
                requestDate: Date,
                status: {
                    type: String,
                    enum: ["pending", "approved", "rejected"],
                    default: "pending",
                },
            },
        ],
    },
    {
        timestamps: true,
    }
);

userSchema.virtual('id').get(function(){
    return this._id.toHexString();
});

userSchema.set('toJSON', {
    virtuals: true,
    transform: function(doc, ret) {
        delete ret._id;
    }
});

module.exports = model("User", userSchema);
