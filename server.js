// Get the packages we need
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const path = require('path');

const Account = require('./models/account');
const Customer = require('./models/customer');

const apiRouter = require('./routes/apiRouter');
const webRouter = require('./routes/webRouter');

const crudControl = require('./controllers/crudControl');

//Connect to the Database
//mongoose.connect('mongodb://localhost:27017/srdesignstudio');

// Create our Express application
var app = express();
app.use(morgan('dev')); // log every request to the console
app.use(bodyParser.urlencoded({extended:true}));

// view engine and resource setup
app.use(express.static(__dirname + '/public'));
app.set('views', path.join(__dirname, './views'));

// Use environment defined port or 3000
var port = process.env.PORT || 3000;

// Create our Express router
var router = express.Router();

// Initial dummy route for testing
// http://localhost:3000/api

//apiRouter(app);

// Register all our routes with /api
app.use('/api', apiRouter);
app.use('/', apiRouter);

// Start the server
app.listen(port);
console.log('HR API running on port ' + port);

//
