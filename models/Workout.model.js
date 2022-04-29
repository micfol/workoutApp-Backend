const { Schema, model } = require("mongoose");

const workoutsSchema = new Schema(
  {
    exercises: [{
      exerciseType:  { type: Schema.Types.ObjectId, ref: "ExerciseType" },
      weight: Number
    }
    ]},
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
