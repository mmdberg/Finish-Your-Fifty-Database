
exports.seed = function(knex, Promise) {
  return knex('races').del()
    .then(() => knex('users').del())
    .then(() => {
      return Promise.all([
        knex('users').insert({
          userName: 'Pizza',
          email: 'pizza@pizza',
          password: 'p'
        }, 'id')
        .then(user => {
          return knex('races').insert([
            {
              raceName: 'Mardi Gras Half',
              state: 'CA',
              time: '2:00:01',
              distance: 'Half Marathon',
              shoes: 'Brooks Ghosts',
              reflections: 'Felt great, drank pickle juice',
              user_id: user[0]
            },
            {
              raceName: 'Spooky 10k',
              state: 'VT',
              time: '1:02:03',
              distance: '10k',
              shoes: 'Nike Pegasus',
              reflections: 'Tough, ate gummy bears',
              user_id: user[0]
            }
          ])
        })
        .then(() => console.log('seeding complete!'))
        .catch(error => console.log('error seeding data1:', error))
      ])
    })
    .catch(error => console.log('error seeding data2:', error))
};
