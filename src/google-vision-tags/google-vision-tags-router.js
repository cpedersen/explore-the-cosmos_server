const path = require("path");
const express = require("express");
const xss = require("xss");
const { tagImages } = require("./google-vision-tags-service");

const router = express.Router();
const jsonParser = express.json();

const serializeTag = (tag) => ({
  id: tag.id,
});

/* -------------------------------------------------------- */
/*                 route ('/') - get all                    */
/* -------------------------------------------------------- */
// router.route("/").get((req, res, next) => {});
router.post("/tag-images", tagImages);

module.exports = router;
