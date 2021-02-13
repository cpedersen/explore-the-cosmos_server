const router = require("express").Router();
const visionRoutes = require("./google-vision-tags/google-vision-tags-router");

// Consolidate the routes in this parent file
router.use("/vision", visionRoutes);

module.exports = router;
