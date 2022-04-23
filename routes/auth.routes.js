const express = require("express");
const bcrypt = require("bcryptjs");
const User = require("../models/User.model");
const { response } = require("../app");
const jwt = require("jsonwebtoken");
const jsonwebtoken = require("jsonwebtoken");
const { isAuthenticated } = require("../middleware/jwt.middleware");

const router = express.Router();

// Route to create a new User
router.post("/signup", async (req, res) =>{
    try {
        const { username, password, email } = req.body;

        // Validation to ensure all form fields are entered by the user
        if (!username || !password || !email) {
            res.status(400).json({ message: "Missing required form fields"});
            return;
        }

        // Validation to ensure Users cannot have the same Username
        const foundUser = await User.findOne({ username });
        if(foundUser) {
            res.status(400).json({ message: "Username is already taken, please enter a new Username"});
        }

        // Encrypts the User's Password
        const salt = bcrypt.genSaltSync(10);
        const hashedPassword = bcrypt.hashSync(password, salt);

        // Creates the User entry for the backend
        const createdUser = await User.create({ email, username, password: hashedPassword });

        res.status(200).json({ email: createdUser.email, username: createdUser.username, _id: createdUser._id })
    }

    catch (e) {
        res.status(500).json({ message: e.message });
    }
});

// Route to allow the User to login to the app
router.post("/login", async (req, res) => {
    const { username, password } = req.body;

    if (!username || !password) {
        res.status(400).json({ message: "Missing Username or Password, please try again."})
    }

    const foundUser = await User.findOne({ username });
    if(!foundUser) {
        res.status(401).json({ message: "Invalid Login Credentials, please try again."})
        return;
    }

    const correctPassword = bcrypt.compareSync(password, foundUser.password);
    if (!correctPassword) {
        res.status(401).json({ message: "Invalid Login Credentials, please try again."})
        return;
    }

    // Get/Create an authentication token
    const authToken = jwt.sign(
        { _id: foundUser._id, email: foundUser.email, username: foundUser.username },
        process.env.TOKEN_SECRET,
        { algorithm: "HS256", expiresIn: "6h" }
    )

    res.status(200).json({ authToken });

});

// // Route to help keep a user logged in when a page is refreshed
// router.get("/verify", isAuthenticated, (req, res) => {
//     res.status(200).json(req.payload);
// });

module.exports = router;