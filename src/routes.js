const router = require("express").Router();
const visionRoutes = require("./google-vision-tags/google-vision-tags-router");
const quotesRoutes = require("./quotes/quotes-router");

router.use("/vision", visionRoutes);
router.use("/quotes", quotesRoutes);

module.exports = router;
