const { Schema, model } = require("mongoose");

const exerciseTypeSchema = new Schema ({
    exerciseName: String, //e.g. Squat, Barbel Row, Bench Press
    }, 
    {
    timestamps: true,
    }
);

module.exports = model("ExerciseType", exerciseTypeSchema);