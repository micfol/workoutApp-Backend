const { Schema, model } = require("mongoose");

const workoutsSchema = new Schema(
  {
        isWorkoutA: Boolean,
        exercises: [{ type: Schema.Types.ObjectId, ref: "ExerciseType" }],
        totalWeightLifted: Number,
        user: { type: Schema.Types.ObjectId, ref: "User" }
    },
        
  {
 timestamp: true
  }
);

module.exports = model("Workouts", workoutsSchema);