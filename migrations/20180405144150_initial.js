
exports.up = function(knex, Promise) {
  return Promise.all([
    knex.schema.createTable('users', function(table) {
      table.increments('id').primary();
      table.string('userName');
      table.timestamps(true, true);
    }),

    knex.schema.createTable('races', function(table) {
      table.increments('id').primary();
      table.string('raceName');
      table.string('state');
      table.string('time');
      table.string('distance');
      table.string('shoes');
      table.string('reflections');
      table.integer('user_id').unsigned()
      table.foreign('user_id').references('users.id');
      table.timestamps(true, true);
    })
  ])
};

exports.down = function(knex, Promise) {
  return Promise.all([
    knex.schema.dropTable('users'),
    knex.schema.dropTable('races')
  ]);
};
