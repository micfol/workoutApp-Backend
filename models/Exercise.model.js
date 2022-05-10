const { Schema, model } = require("mongoose");

const exerciseSchema = new Schema ({
    exerciseName: String, //e.g. Squat, Barbel Row, Bench Press
    sets: [ Number ], // 5, 5, 5, 5, 5
    weight: Number, // 45
    user: { type: Schema.Types.ObjectId, ref: "User" }
    }, 
    {
    timestamps: true,
    }
);

module.exports = model("Exercise", exerciseSchema);