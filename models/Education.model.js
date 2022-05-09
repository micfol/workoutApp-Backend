const { Schema, model } = require("mongoose");

const educationSchema = new Schema ({
    nameOfExercise: String, //e.g. Squat, Barbel Row, Bench Press
    bodyPart: String, // Shoulders, Upper Legs, etc.
    equipment: String, // Barbell
    target: String, // Delts, Glutes
    image: String, // Url for gif
    instructions: String // How-To walkthrough
    }
);

module.exports = model("Education", educationSchema);