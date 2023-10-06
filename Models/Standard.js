const { Schema, model } = require("mongoose");

const standardSchema = new Schema(
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

standardSchema.virtual('id').get(function(){
    return this._id.toHexString();
});

standardSchema.set('toJSON', {
    virtuals: true,
    transform: function(doc, ret) {
        delete ret._id;
    }
});

module.exports = model("Standard", standardSchema);
