
exports.up = function(knex, Promise) {
  return Promise.all([
    knex.schema.table('races', function(table) {
      table.string('city');
      table.string('completed')
    })
  ]);
};

exports.down = function(knex, Promise) {
  return Promise.all([
    knex.schema.table('races', function(table) {
      table.dropColumn('city')
      table.dropColumn('completed')
    })
  ])
};