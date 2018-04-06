const express = require('express');
const app = express();
const environment = process.env.NODE_ENV || 'development';
const configuration = require('./knexfile')[environment];
const database = require('knex')(configuration);
const bodyParser = require('body-parser');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use((request, response, next) => {
  response.header('Access-Control-Allow-Origin', '*')
  next()
})

app.get('/api/v1/users', (request, response) => {
  database('users').select()
    .then((users) => {
      response.status(200).json(users);
    })
    .catch((error) => {
      response.status(500).json({ error });
    });
});

// app.get('/api/v1/users/:id', (request, response) => {
//   database('users').select()
//     .then((users) => {
//       response.status(200).json(users.find(user => user.id === id))
//     })
//     .catch((error) => {
//       response.status(500).json({ error });
//     });
// });

app.get('/api/v1/races/', (request, response) => {
  database('races').select()
    .then((races) => {
      response.status(200).json(races);
    })
    .catch((error) => {
      response.status(500).json({ error });
    });
});

app.post('/api/v1/users', (request, response) => {
  const user = request.body;

  for (let requiredParameter of ['userName']) {
    if(!user[requiredParameter]) {
      return response 
        .status(422)
        .send({error: `You're missing a ${requiredParameter} property.` })
    }
  }

  database('users').insert(user, 'id')
    .then(user => {
      response.status(201).json({ id: user[0] })
    })
    .catch(error => {
      response.status(500).json({ error });
    });
});

app.listen(3000, () => {
  console.log('Express Intro running on localhost:3000');
});




