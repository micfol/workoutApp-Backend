const router = require("express").Router();

router.get("/", (req, res, next) => {
  res.json("All good in here");
});

// app.use((req, res, next) => {
//   res.sendFile(__dirname + "/public/index.html");
// });
module.exports = router;
