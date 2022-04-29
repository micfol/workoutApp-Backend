const { Schema, model } = require("mongoose");

const exerciseTypeSchema = new Schema ({
    exerciseName: String, //e.g. Squat, Barbel Row, Bench Press
    sets: [ Number ], // 5, 5, 5, 5, 5
    weight: Number, // 45
    user: { type: Schema.Types.ObjectId, ref: "User" }
    }, 
    {
    timestamps: true,
    }
);

module.exports = model("ExerciseType", exerciseTypeSchema);