const { Schema, model } = require("mongoose");

const userSchema = new Schema(
  {
    username: { type: String, unique: true, required: true },
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    password: { type: String, required: true },
    email: String,
    workoutEntries: [{ type: Schema.Types.ObjectId, ref: 'Workouts' }],
    exerciseEntries: [{ type: Schema.Types.ObjectId, ref: 'ExerciseType' }],
    squat: { type: Number, default: 20},
    bench: { type: Number, default: 20},
    row: { type: Number, default: 30},
    military: { type: Number, default: 20},
    deadlift: { type: Number, default: 40}

  },
  {
    timestamps: true,
  }
);

const User = model("User", userSchema);

module.exports = User;