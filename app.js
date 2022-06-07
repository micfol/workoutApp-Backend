require("dotenv/config");

require("./db");

const express = require("express");

const app = express();

require("./config")(app);

const allRoutes = require("./routes/index.routes");
app.use("/api", allRoutes);

const authRoutes = require("./routes/auth.routes");
app.use("/api", authRoutes);

const workoutRoutes = require("./routes/workout.routes");
app.use("/api", workoutRoutes);

const educationRoutes = require("./routes/education.routes");
app.use("/api", educationRoutes);

app.use((req, res, next) => {
    res.sendFile(__dirname + "/public/index.html");
  });
  
require("./error-handling")(app);



module.exports = app;