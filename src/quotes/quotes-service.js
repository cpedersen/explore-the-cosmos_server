const QuotesService = {
  /*getAllQuotes(knex, table = DATABASE_TABLE) {*/
  getAllQuotes(knex) {
    return knex.select("*").from("cosmos_quotes");
  },
  /*getById(knex, id, table = DATABASE_TABLE) {*/
  getById(knex, id) {
    return knex.select("*").from("cosmos_quotes").where("id", id).first();
  },
};

module.exports = QuotesService;
