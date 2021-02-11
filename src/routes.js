const router = require("express").Router();
const visionRoutes = require("./google-vision-tags/google-vision-tags-router");
//const quotesRoutes = require("./quotes/quotes-router");

// Consolidate the routes in this parent file
router.use("/vision", visionRoutes);
//router.use("/quote", quotesRoutes);

module.exports = router;
