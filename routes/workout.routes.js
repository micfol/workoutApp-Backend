const router = require("express").Router();
const Workout = require("../models/Workout.model");
const ExerciseType = require("../models/ExerciseType.model");

// POST Route to create Exercise Types
router.post("/exercisetype", async (req, res) => {
    try {
        const { exerciseName } = req.body;
        if (!exerciseName) {
            res.status(400).json({ message: "Incomplete Exercise Data" })
            return;
        }
        const response = await ExerciseType.create({exerciseName});
        res.status(200).json(response);
    }
    catch (e) {
        res.status(500).json({ message: e })
    }
});

// GET Route to get Exercise Type
router.get("/exercisetype/:exerciseNameId", async (req, res) => {
    try {
        const response = await ExerciseType.findById(req.params.exerciseNameId);
        res.status(200).json(response);
    }
    catch {
        res.status(500).json({ message: e });
    }
});

router.get("/exercisetype", async (req, res) => {
    try {
        const response = await ExerciseType.find();
        res.status(200).json(response);
    }
    catch {
        res.status(500).json({ message: e });
    }
});

// GET Route for the array of exercises
router.get("/workout", async (req, res) => {
    try {
        const response = await Workout.find();
        res.status(200).json(response);
    }
    catch (e) {
        res.status(500).json({ message: e });
    }
});

router.post("/exerciseentry", async (req, res) => {
    try {
        const { exerciseName, sets, weight } = req.body;
        if (!exerciseName || !sets || !weight) {
            res.status(400).json({ message: "Incomplete Exercise Data" })
            return;
        }
        const response = await ExerciseType.create({exerciseName, sets, weight});
        res.status(200).json(response);
    }
    catch (e) {
        res.status(500).json({ message: e })
    }
});



// GET Route for all workouts
// router.get("/workout", async (req, res) => {
//     try {
//         const response = await Workout.find().populate('User');
//         // populate function?
//         res.status(200).json(response);
//     }
//     catch (e) {
//         res.status(500).json({ message: e });
//     }
// });

// GET One Workout
// router.get("/workouts/:workoutId", async (req, res) => {
//     try {
//         const response = await Workout.findById(req.params.workoutId).populate("workoutDetails");
//         res.status(200).json(response);
//     }
//     catch {
//         res.status(500).json({ message: e });
//     }
// });

module.exports = router;