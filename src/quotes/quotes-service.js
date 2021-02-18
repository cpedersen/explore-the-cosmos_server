const QuotesService = {
  getAllQuotes(knex) {
    return knex.select("*").from("cosmos_quotes");
  },
  getById(knex, id) {
    return knex.select("*").from("cosmos_quotes").where("id", id).first();
  },
};

module.exports = QuotesService;
