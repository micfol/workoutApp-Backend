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

// GET Route to get Exercise Type
router.get("/exercisetype/:exerciseNameId", async (req, res) => {
    try {
        const response = await Exercise.findById(req.params.exerciseNameId);
        res.status(200).json(response);
    }
    catch {
        res.status(500).json({ message: e });
    }
});

router.get("/exercisetype", async (req, res) => {
    try {
        const response = await Exercise.find();
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

// POST Route to log the workout entry
router.post("/exerciseentry", async (req, res) => {
    try {
        const { isWorkoutA, workoutExercises, user } = req.body;
        workoutExercises.forEach((x) => { 
            x.user = user         // Adds _id to each exercise object
        });

        const responseExercise = await Exercise.create(workoutExercises, {new: true}); // Creates 3 new exercies entries
        const exerciseIDs = responseExercise.map((x) => x._id); //returns array of the 3 created entry _ids.\
        
        // const totalWeightLifted = workoutExercises.map(exercise => exercise.sets)

        // console.log('totalWeightLifted', totalWeightLifted)
        const totalWeightLifted = workoutExercises.map(exercise => exercise.sets)
        console.log('totalWeightLifted', totalWeightLifted)
        console.log('isWorkoutA :>> ', isWorkoutA);
        const responseWorkout = await Workout.create({isWorkoutA, exercises: exerciseIDs, totalWeightLifted: 0, user});
        
        const responseUpdateUser = await User.findByIdAndUpdate(user, { $addToSet: { exerciseEntries: exerciseIDs, workoutEntries: responseWorkout._id } }, {new: true} ).populate('workoutEntries')
        
        console.log('3 responses', responseExercise, responseWorkout, responseUpdateUser)
        res.status(200).json({responseUpdateUser})
    }
    catch (e) {
        console.log('e', e)
        res.status(500).json({ message: e })
    }
});

// GET Route to retrieve a user's total logged workouts, and calculate into a percentage of program goal
// router.get("/progress/:id", async (req, res) => {
//     try {
//         const id = req.params.id;
//         const response = await Workout.countDocuments({ user: id });
//         const totalWorkouts = response/36 * 100;
//         console.log('totalWorkouts :>> ', totalWorkouts);
//         res.status(200).json(totalWorkouts);
//     }
//     catch (e) {
//         res.status(500).json({ message: e });
//     }
// });

// GET Route to Populate Total Workout Session Information by User 
router.get("/progress/:id", async (req, res) => {
    try{
        const id = req.params.id;
        const userWorkoutSessions = await Workout.find({ user: id }).populate({path: 'exercises'});
        console.log('userWorkoutSessions', userWorkoutSessions)
        const sortbyNewest = [...userWorkoutSessions].sort((a, b) => Date.parse(b.createdAt) - Date.parse(a.createdAt))
        console.log('sortbyNewest', sortbyNewest)
        res.status(200).json(userWorkoutSessions);
    }
    catch (e) {
        console.log('error', e)
        res.status(500).json({ e });
    }
});

module.exports = router;