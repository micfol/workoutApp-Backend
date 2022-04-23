const { Schema, model } = require("mongoose");

const workoutsSchema = new Schema ({
    workout: {
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
    user: { type: Schema.Types.ObjectId, ref: "User" }
    },
    {
    timestamps: true,
    }
);

module.exports = model("Workouts", workoutsSchema);
