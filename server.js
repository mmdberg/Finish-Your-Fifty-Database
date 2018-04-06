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

app.get('/api/v1/users/:id', async (request, response) => {
  const id = parseInt(request.params.id)
  try {
    const users = await database('users').select()
    const user = users.find(user => user.id === id)
    response.status(200).json(user)
  } catch (error) {
    response.status(500).json(error)
  }
});

app.get('/api/v1/races', (request, response) => {

  database('races').select()
    .then((races) => {
      response.status(200).json(races);
    })
    .catch((error) => {
      response.status(500).json({ error });
    });
});

app.get('/api/v1/races/:id', async (request, response) => {
  const id = parseInt(request.params.id)
  try {
    const races = await database('races').select()
    const userRaces = races.filter(race => race.user_id === id)
    response.status(200).json(userRaces)
  } catch (error) {
    response.status(500).json(error)
  } 
});

app.post('/api/v1/users', (request, response) => {
  const user = request.body;

  for (let requiredParameter of ['userName', 'email', 'password']) {
    if(!user[requiredParameter]) {
      return response 
        .status(422)
        .send({error: `You're missing a(n) ${requiredParameter}.` })
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

app.post('/api/v1/races', (request, response) => {
  const race = request.body;

  for (let requiredParameter of ['raceName', 'state', 'time', 'distance', 'user_id']) {
    if(!race[requiredParameter]) {
      return response 
        .status(422)
        .send({error: `You're missing a(n) ${requiredParameter}.`})
    }
  }

  database('races').insert(race, 'id')
    .then(race => {
      response.status(201).json({id: race[0] })
    })
    .catch(error => {
      response.status(500).json({ error })
    });
});

app.listen(3000, () => {
  console.log('Express Intro running on localhost:3000');
});




