const router = require("express").Router();
const Workout = require("../models/Workout.model");
const Exercise = require("../models/Exercise.model");
const User = require("../models/User.model")


// GET Route returns array of all Workout entries of user
// with individual Exercises populated. Most recent first.
// ( from api.js / getAllWorkouts(user))
router.get("/workout/:userId", async (req, res) => {
    try{
        const userId = req.params.userId;
        const userWorkoutSessions = await Workout.find({ user: userId }).populate({path: 'exercises'});
        const sortbyNewest = [...userWorkoutSessions].sort((a, b) => Date.parse(b.createdAt) - Date.parse(a.createdAt))
        res.status(200).json(sortbyNewest);
    }
    catch (e) {
        console.log('error', e)
        res.status(500).json({ e });
    }
});

// POST Route to log the workout entry 
//(from api.js / addWorkout(workoutObj))
router.post("/workout", async (req, res) => {
    try {
        const { isWorkoutA, workoutExercises, user } = req.body;
        console.log('req.body', req.body)
        workoutExercises.forEach((x) => { 
            x.user = user         // Adds _id to each exercise object
        });

        const responseExercise = await Exercise.create(workoutExercises, {new: true}); // Creates 3 new exercies entries
        const exerciseIDs = responseExercise.map((x) => x._id); //returns array of the 3 created entry _ids.\
        
        // const totalWeightLifted = workoutExercises.map(exercise => exercise.sets)

        // console.log('totalWeightLifted', totalWeightLifted)
        const totalWeightLifted = workoutExercises.map(exercise => exercise.sets)
          const responseWorkout = await Workout.create({isWorkoutA, exercises: exerciseIDs, totalWeightLifted: 0, user});
        
        const responseUpdateUser = await User.findByIdAndUpdate(user, { $addToSet: { exerciseEntries: exerciseIDs, workoutEntries: responseWorkout._id } }, {new: true} ).populate('workoutEntries')
        
        res.status(200).json({responseUpdateUser})
    }
    catch (e) {
        console.log('e', e)
        res.status(500).json({ message: e })
    }
});


// DELETE Route to remove a workout  
// (from api.js / deleteWorkout(workoutId))
router.delete("/workout/:workoutId", async (req, res) => {
    try {
        await Workout.findByIdAndDelete(req.params.workoutId);
        res.status(200).json({ message: `Workout with ID ${req.params.workoutId} was deleted.`});
    }
    catch {
        res.status(500).json({ message: e });
    }
});
module.exports = router;