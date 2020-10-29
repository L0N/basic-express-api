const express = require('express');
const app = express();

const dotenv = require('dotenv');
const mongoose = require('mongoose');

const port = (process.env.PORT || 3000);
const host = (process.env.HOST || '127.0.0.1');
dotenv.config();
const url = process.env.MONGO_URI;
const loc = process.env.MONGO_LOC;

mongoose.connect(loc, { useNewUrlParser: true, useUnifiedTopology: true });
const db = mongoose.connection;
db.on('error', (error) => { 
    console.error(error);
});
db.once('open', () => {
    console.log('Connected to Database');
});

// middleware
app.use(express.json());

const subscriberRouter = require('./routes/subscribers');
app.use('/subscribers', subscriberRouter);

app.listen(port, host, ()=>{
    console.log(`App running on http://${host}:${port}`)
});
