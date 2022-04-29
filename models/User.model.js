const { Schema, model } = require("mongoose");

const userSchema = new Schema(
  {
    username: { type: String, unique: true, required: true },
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    password: { type: String, required: true },
    email: String,
    workoutEntries: [{ type: Schema.Types.ObjectId, ref: 'Workouts' }]
  },
  {
    timestamps: true,
  }
);

const User = model("User", userSchema);

module.exports = User;