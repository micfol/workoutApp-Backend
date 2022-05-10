const router = require("express").Router();
const Education = require("../models/Education.model");

// POST Route to create Education Entry
router.post("/education", async (req, res) => {
    try {
        const { nameOfExercise, bodyPart, equipment, target, image, instructions } = req.body;
        if (!nameOfExercise || !bodyPart || !equipment || !target || !image || !instructions) {
            res.status(400).json({ message: "Incomplete Education Data" })
            return;
        }
        const response = await Education.create({ nameOfExercise, bodyPart, equipment, target, image, instructions });
        res.status(200).json(response);
    }
    catch (e) {
        res.status(500).json({ message: e })
    }
});

// GET Route to Retrieve All Exercise Education
router.get("/education", async (req, res) => {
    try{
        const response = await Education.find();
        res.status(200).json(response);
    }
    catch {
        res.status(500).json({ message: e });
    }
});

module.exports = router;