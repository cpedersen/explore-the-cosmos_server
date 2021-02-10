const path = require("path");
const express = require("express");
const xss = require("xss");
const QuotesService = require("./quotes-service");

const quotesRouter = express.Router();
const jsonParser = express.json();

const serializeQuote = (quote) => ({
  id: quote.id,
  title: xss(quote.author),
  content: xss(quote.content),
});

/* -------------------------------------------------------- */
/*                 route ('/') - get all                    */
/* -------------------------------------------------------- */
quotesRouter.route("/").get((req, res, next) => {
  const knexInstance = req.app.get("db");
  QuotesService.getAllQuotes(knexInstance)
    .then((quotes) => {
      res.json(quotes.map(serializeQuote));
    })
    .catch(next);
});

module.exports = quotesRouter;
