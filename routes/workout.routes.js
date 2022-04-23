const router = require("express").Router();
const { async } = require("jshint/src/prod-params");
const Workout = require("../models/Workout.model");

// GET Route for all workouts
router.get("/workout", async (req, res) => {
    try {
        const response = await Workout.find().populate('User');
        // populate function?
        res.status(200).json(response);
    }
    catch (e) {
        res.status(500).json({ message: e });
    }
});

// Post Route to Create Workout Entry
router.post("/workout", async (req, res) => {
    try {
        const { workoutType, exerciseName, weightPerRep, setsArray } = req.body;
        if (!workoutType || !exerciseName || !weightPerRep || setsArray.length > 5) {
            res.status(400).json({ message: "Missing Workout Information"})
            return;
        }
        const response = await Workout.create({ workoutType, exerciseName, weightPerRep, setsArray, allSetsSuccess, totalWeightLifted});
        res.status(200).json(response);
    }
    catch (e) {
        res.status(500).json({ message: e })
    }
});

// Post Route to Create Workout Detail Entry
// router.post("/workoutdetail", async (req, res) => {
//     try {
//         const { exerciseName, setsCompleted, repsPerSet, weightPerRep, workoutId } = req.body;
//         const response = await WorkoutDetail.create({ exerciseName, setsCompleted, repsPerSet, weightPerRep });
//         const workoutDetailResponse = await Workout.findByIdAndUpdate(workoutId, 
//             { $push: {WorkoutDetail: response._id}},
//             { new: true });
//         res.status(200).json(workoutDetailResponse);
//     }
//     catch {
//         res.status(500).json({ message: e });
//     }
// });

// GET One Workout
router.get("/workouts/:workoutId", async (req, res) => {
    try {
        const response = await Workout.findById(req.params.workoutId).populate("workoutDetails");
        res.status(200).json(response);
    }
    catch {
        res.status(500).json({ message: e });
    }
});