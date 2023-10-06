const { Schema, model } = require("mongoose");

const boardSchema = new Schema(
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

boardSchema.virtual('id').get(function(){
    return this._id.toHexString();
});

boardSchema.set('toJSON', {
    virtuals: true,
    transform: function(doc, ret) {
        delete ret._id;
    }
});

module.exports = model("Board", boardSchema);
