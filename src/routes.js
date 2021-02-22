const router = require("express").Router();
const visionRoutes = require("./google-vision-tags/google-vision-tags-router");

router.use("/vision", visionRoutes);

module.exports = router;
