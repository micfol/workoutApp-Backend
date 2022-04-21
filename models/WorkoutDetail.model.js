const mongoose = require ("mongoose");
const { Schema, model } = mongoose;

const workoutDetail = new Schema ({
    exerciseName:  String,
    setsCompleted:  Number,
    repsPerSet:  Number,
    weightPerRep:  Number,
    workoutCompleted: { type: Schema.Types.ObjectId, ref: "WorkoutHistory"}
});

module.exports = model("WorkoutDetail", workoutDetailSchema);