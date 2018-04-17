
exports.up = function(knex, Promise) {
  return Promise.all([
    knex.schema.table('races', function(table) {
      table.string('date');
    })
  ]);
};

exports.down = function(knex, Promise) {
  return Promise.all([
    knex.schema.table('races', function(table) {
      table.dropColumn('date')
    })
  ])
};