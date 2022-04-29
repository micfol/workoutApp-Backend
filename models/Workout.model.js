const { Schema, model } = require("mongoose");

const workoutsSchema = new Schema(
  {
        isWorkoutA: Boolean,
        exercises: [{
            exerciseType:  { type: Schema.Types.ObjectId, ref: "ExerciseType" },
        }],
        totalWeghtLifted: Number,
        user: { type: Schema.Types.ObjectId, ref: "User" }
    },
        
  {
 timestamp: true
  }
);

module.exports = model("Workouts", workoutsSchema);

/*  workout: {
        exerciseDetail: {
            workoutType: String,
            exerciseName: String,
            weightPerRep: Number,
            setsArray: [Number],
            //double check how this turns out
            allSetsSuccess: Boolean
        }
    },
    totalWeightLifted: Number,
    user: { type: Schema.Types.ObjectId, ref: "User" } */
