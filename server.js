
const mongoose =require('mongoose');
require('dotenv').config({ path: 'variables.env' });
mongoose.connect(process.env.DB);
mongoose.Promise = global.Promise;
mongoose.connection.on('error', (err) => {
    console.error(`!!!${err.message}!!!!`);
});

require('./models/User');
require('./models/Exercise');

const path = require('path')
const express = require('express');
const app = express();

const listener = app.listen(process.env.PORT, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});

const bodyParser = require('body-parser');

app.use(express.static('public'));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));


app.get("/", function (request, response) {
  response.sendFile(__dirname + '/views/index.html');
});

const routes = require('./routes/index');
app.use('/', routes);