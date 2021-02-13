const path = require("path");
const express = require("express");
const xss = require("xss");
const { tagImages } = require("./google-vision-tags-service");

const router = express.Router();
const jsonParser = express.json();

// Let's serialize an object to a JSON string.
// We just need the tag id.
const serializeTag = (tag) => ({
  id: tag.id,
});

/* -------------------------------------------------------- */
/*                           Route                          */
/* -------------------------------------------------------- */
router.post("/tag-images", tagImages);

module.exports = router;
