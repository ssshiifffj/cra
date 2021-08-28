const keys = require('./keys');

// Express App Setup
const express = require('express');
const cors = require('cors');

const app = express();
// add middlewares
app.use(cors({origin: '*'}));
// to have body in request
app.use(express.json());

// Postgres Client Setup
const { Pool } = require('pg');
const pgClient = new Pool({
    user: keys.pgUser,
    host: keys.pgHost,
    database: keys.pgDatabase,
    password: keys.pgPassword,
    port: keys.pgPort
});

pgClient.on('error', ()=> console.log('Lost PG connection'));

pgClient
.query('CREATE TABLE IF NOT EXISTS values (number INT)')
.catch((err) => console.log(err.message))


//Redis Client Setup
const redis = require('redis');

const redisClient = redis.createClient({
    host: keys.redisHost,
    port: keys.redisPort,
    retry_strategy: () => (1000)
});


const redisPublisher = redisClient.duplicate();


// Express route handlers

app.get('/', (req, res) => {
    res.send('Hi');
});

app.get('/values/pg', async (req, res) => {
    const values = await pgClient.query('SELECT * from values')
                .catch((err) => (console.log(err.message)));
        res.send(values.rows)

});

app.get('/values/redis', (req, res) => {
    redisClient.hgetall('values', (err, values) => {
        res.send(values);
    })
})

app.post('/values', (req, res) => {
    const index = req.body.index;
    if (parseInt(index) > 40) {
        return res.status(422).send('Index too high');
    }
    redisClient.hset('values', index, 'nothing yet');
    redisPublisher.publish('insert', index);
    pgClient.query('INSERT INTO values(number) VALUES ($1)', [index]);

    return res.send({success: true});
}); 

app.listen(5000, err => {
    console.log('Listening');
})

// 5 adding postgres as a service