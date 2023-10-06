const { Schema, model } = require("mongoose");

const subjectSchema = new Schema(
    {
        name: {
            type: String,
            unique: true,
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

subjectSchema.virtual('id').get(function(){
    return this._id.toHexString();
});

subjectSchema.set('toJSON', {
    virtuals: true,
    transform: function(doc, ret) {
        delete ret._id;
    }
});

module.exports = model("Subject", subjectSchema);
