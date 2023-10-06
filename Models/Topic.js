const { Schema, model } = require("mongoose");

const topicSchema = new Schema(
    {
        name: {
            type: String,
            unique: true,
            required: true,
        },
        userId: {
            type: Schema.Types.ObjectId,
        },
        subjectId: {
            type: Schema.Types.ObjectId,
            ref: "subjects",
        },
    },
    {
        timestamps: true,
    }
);

topicSchema.virtual('id').get(function(){
    return this._id.toHexString();
});

topicSchema.set('toJSON', {
    virtuals: true,
    transform: function(doc, ret) {
        delete ret._id;
    }
});

module.exports = model("Topic", topicSchema);
