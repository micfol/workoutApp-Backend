const { Schema, model } = require("mongoose");

const workoutsSchema = new Schema(
  {
        isWorkoutA: Boolean,
        exercises: [{ type: Schema.Types.ObjectId, ref: "Exercise" }],
        totalWeightLifted: Number,
        user: { type: Schema.Types.ObjectId, ref: "User" }
    },
        
  {
 timestamps: true
  }
);

module.exports = model("Workouts", workoutsSchema);