// dotenv allows us to declare environment variables in a .env file, \
// find out more here https://github.com/motdotla/dotenv
require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const passport = require('passport');

// Require our custom strategies
require('./services/passport');

mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost/final-project-starter-app')
    .then(() => console.log('[mongoose] Connected to MongoDB'))
    .catch(() => console.log('[mongoose] Error connecting to MongoDB'));

const app = express();

const authenticationRoutes = require('./routes/authentication');
const listRoutes = require('./routes/ListRoutes');
const itemRoutes = require('./routes/ItemRoutes');
const yelpRoutes = require('./routes/YelpRoutes');
const authStrategy = passport.authenticate('authStrategy', {
    session: false
});

app.use(bodyParser.json());
app.use('/api', authenticationRoutes);
app.use('/api/lists', authStrategy, listRoutes);
app.use('/api/items', authStrategy, itemRoutes);
// app.use('/yelp', authStrategy, yelpRoutes);

app.use((err, req, res, next) => {
    return res.status(500).send(`Error: ${err}`);
});

app.get('/api/secret', authStrategy, function(req, res, next) {
    res.send(`The current user is ${req.user.username}`);
});


const axios = require('axios');

app.get('/yelp', function(req, res, next) {

    axios.get('https://api.yelp.com/v3/businesses/search?term=restaurant&latitude=30.206515&longitude=-97.880577&sort_by=rating&limit=50', {
            headers: {
                authorization: process.env.YELP_TOKEN,
                Content_Type: "application/x-www-form-urlencoded",
                client_id: process.env.YELP_CLIENT_ID,
                client_secret: process.env.YELP_CLIENT_SECRET
            }
        })
        .then(resp => {
            console.log(resp.data);
            return res.json(resp.data);
        })
        .catch(err => res.json(err));
});

const port = process.env.PORT || 3101;
app.listen(port, () => {
    console.log(`Listening on port:${port}`);
});
