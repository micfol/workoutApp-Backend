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

require("./error-handling")(app);

module.exports = app;
