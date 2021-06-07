require('dotenv').config(); // read environment variables from .env file
const express = require('express');
const cors = require('cors'); // middleware to enable CORS (Cross-Origin Resource Sharing)
const app = express();
const port = process.env.PORT || 8000; // if not defined, use port 8080
const host = process.env.HOST || '127.0.0.1'; // if not defined, localhost
app.use(cors()); //enable ALL CORS requests (client requests from other domain)
app.use(express.json()); //enable parsing JSON body data
// root route -- /api/
app.get('/', function (req, res) {
    res.status(200).json({ message: 'home -- TRIVIA-OWL API' });
});

// routing middleware for resource users
app.use('/users', require('./routes/users.routes.js'));

// routing middleware for resource activities
app.use('/activities', require('./routes/activities.routes.js'));

// routing middleware for resource trophies
app.use('/trophies', require('./routes/trophies.routes.js'));

// routing middleware for home page
app.use('/', require('./routes/auth.routes.js'));

// routing middleware for resource USER AUTH
// app.use('/userAuth', require('./routes/userAuth.routes.js'))
// handle invalid routes
app.get('*', function (req, res) {
    res.status(404).json({ message: 'WHAT???' });
})
app.listen(port, host, () => console.log(`App listening at http://${host}:${port}/`));