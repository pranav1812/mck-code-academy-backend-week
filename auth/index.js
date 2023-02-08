const express= require('express');
const cors= require('cors');
const {
    createClient
}= require('redis');

global.redisClient= createClient();

redisClient.on('error', err => console.log('Redis Client Error', err));
redisClient.connect().then(() => {
    console.log('Connected to Redis');
}).catch(err => {
    console.log('Redis Connection Error', err);
});


const app= express();

app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(cors());

app.get('/', (req, res) => {
    res.send('Hello World!');
});

app.use('/auth', require('./routes/auth'));

app.listen(8000, () => {
    console.log('Server started on port 8000');
});