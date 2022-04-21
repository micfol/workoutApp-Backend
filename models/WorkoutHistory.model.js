const { Schema, model } = require("mongoose");

const workoutHistorySchema = new Schema ({
    date: Date,
    totalWeightLifted: Number,
    workoutDetails: [{ type: Schema.Types.ObjectId, ref: "WorkoutDetail" }],
    increaseWeightNextWorkout: Boolean
})

module.exports = model("WorkoutHistory", workoutHistorySchema);