const path = require("path");
const express = require("express");
const xss = require("xss");
const QuotesService = require("./quotes-service");
const quotesRouter = express.Router();
const jsonParser = express.json();

const serializeQuote = (quote) => ({
  id: quote.id,
  author: xss(quote.author),
  content: xss(quote.content),
});

/* -------------------------------------------------------- */
/*                    Route Get                             */
/* -------------------------------------------------------- */
quotesRouter
  .route("/quote")
  .get((req, res, next) => {
    const knexInstance = req.app.get("db");
    // Find random quote
    let quotesArray = QuotesService.getAllQuotes(knexInstance)
      .then((quotes) => {
        console.log("Quotes:", quotes);
        const quote = quotes
          .map(serializeQuote)
          .sort(() => (Math.random() > 0.5 ? 1 : -1))[0];
        console.log("Quote:", quote);
        res.json(quote);
      })
      .catch((...err) => {
        console.log("Error", ...err);
        // TODO - fix this
        // next(...err);
        res.json({
          id: 404,
          author: "...",
          content: "Hardcoded quote...",
        });
      });
    console.log("quotesArray: ", quotesArray, knexInstance);
  })
  .post(jsonParser, (req, res, next) => {
    const { author, content } = req.body;
    const newQuote = { author, content };

    for (const [key, value] of Object.entries(newQuote))
      if (value == null)
        return res.status(400).json({
          error: { message: `Missing '${key}' in request body` },
        });

    QuotesService.insertQuote(req.app.get("db"), newQuote)
      .then((quote) => {
        res
          .status(201)
          .location(path.posix.join(req.originalUrl, `/${quote.id}`))
          .json(serializeFolder(quote));
      })
      .catch(next);
  });

module.exports = quotesRouter;
