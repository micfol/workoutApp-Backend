const router = require("express").Router();
const Workout = require("../models/Workout.model");
const Exercise = require("../models/Exercise.model");
const User = require("../models/User.model")

// POST Route to create Exercise Types
router.post("/exercisetype", async (req, res) => {
    try {
        const { exerciseName } = req.body;
        if (!exerciseName) {
            res.status(400).json({ message: "Incomplete Exercise Data" })
            return;
        }
        const response = await Exercise.create({ exerciseName });
        res.status(200).json(response);
    }
    catch (e) {
        res.status(500).json({ message: e })
    }
});

// DELETE Route to remove an exercise workout session
router.delete("/workout/:workoutId", async (req, res) => {
    try {
        await Workout.findByIdAndDelete(req.params.workoutId);
        res.status(200).json({ message: `Workout with ID ${req.params.workoutId} was deleted.` });
    }
    catch {
        res.status(500).json({ message: e });
    }
});

// // GET Route to get Exercise Type
// router.get("/exercisetype/:exerciseNameId", async (req, res) => {
//     try {
//         const response = await Exercise.findById(req.params.exerciseNameId);
//         res.status(200).json(response);
//     }
//     catch {
//         res.status(500).json({ message: e });
//     }
// });

// router.get("/exercisetype", async (req, res) => {
//     try {
//         const response = await Exercise.find();
//         res.status(200).json(response);
//     }
//     catch {
//         res.status(500).json({ message: e });
//     }
// });

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

// POST Route to log the workout entry
router.post("/exerciseentry", async (req, res) => {
    try {
        const { isWorkoutA, workoutExercises, user } = req.body;
       const exercises = workoutExercises.map((exercise) => {
            return {...exercise[1], user: user} 
        })
        const weightIncrease = {
            squat: 2.5,
            bench: 2.5,
            row: 2.5,
            military: 2.5,
            deadlift: 5
        }
        console.log('workoutExercises', workoutExercises)
        const workingWeight = workoutExercises.map((exercise) => {
            if (exercise[1].sets.every(set => set === 5)) {
                exercise[1].weight = exercise[1].weight + weightIncrease[exercise[0]]
            }
            return [exercise[0], exercise[1].weight]
        })
        console.log('workingWeight', workingWeight)
        const workingWeightSquats = Object.fromEntries(workingWeight)
        console.log('workingWeightSquats', workingWeightSquats)
        
        const responseExercise = await Exercise.create(exercises, { new: true }); // Creates 3 new exercies entries
        const exerciseIDs = responseExercise.map((x) => x._id); //returns array of the 3 created entry _ids.\

        // const totalWeightLifted = workoutExercises.map(exercise => exercise.sets)

        // console.log('totalWeightLifted', totalWeightLifted)
        console.log('isWorkoutA :>> ', isWorkoutA);
        const responseWorkout = await Workout.create({ isWorkoutA, exercises: exerciseIDs, work: 0, user });

        const responseUpdateUser = await User.findByIdAndUpdate(user, { $addToSet: { exerciseEntries: exerciseIDs, workoutEntries: responseWorkout._id, }, ...workingWeightSquats }, { new: true }).populate('workoutEntries')

        res.status(200).json({ responseUpdateUser })
    }
    catch (e) {
        console.log('e', e)
        res.status(500).json({ message: e })
    }
});

// GET Route to Populate Total Workout Session Information by User 
router.get("/progress/:id", async (req, res) => {
    try {
        const id = req.params.id;
        const userWorkoutSessions = await Workout.find({ user: id }).populate({ path: 'exercises' });
        const sortedbyNewest = [...userWorkoutSessions].sort((a, b) => Date.parse(b.createdAt) - Date.parse(a.createdAt))
        res.status(200).json(sortedbyNewest);
    }
    catch (e) {
        console.log('error', e)
        res.status(500).json({ e });
    }
});

module.exports = router;