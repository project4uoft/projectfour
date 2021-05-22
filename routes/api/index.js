const router = require("express").Router();
const path = require("path");

const userRoutes = require("./user");


// Users
router.use("/user", userRoutes);

// If no API routes are hit, send the React app
router.use(function(req, res) {
    res.sendFile(path.join(__dirname, "../client/build/index.html"));
  });


module.exports = router;
