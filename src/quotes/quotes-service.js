const QuotesService = {
  getAllQuotes(knex) {
    return knex.select("*").from("cosmos_quotes");
  },
  getById(knex, id) {
    return knex.from("cosmos_quotes").select("*").where("id", id).first();
  },
};

module.exports = QuotesService;
