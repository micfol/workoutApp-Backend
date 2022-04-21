const router = require("express").Router();
const { async } = require("jshint/src/prod-params");
const WorkoutDetail = require("../models/WorkoutDetail.model");
const WorkoutHistory = require("../models/WorkoutHistory.model")

// GET Route for all workouts
router.get("/workouts", async (req, res) => {
    try {
        const response = await WorkoutHistory.find().populate("workoutDetails");
        // double check the populate function
    }
    catch (e) {
        res.status(500).json({ message: e });
    }

})