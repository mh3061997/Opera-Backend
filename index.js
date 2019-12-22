// IMportant requires 
const mongoose = require('mongoose');
const express = require('express');
const bodyParser = require('body-parser');
const autoIncrement = require('mongoose-auto-increment');

// the routes used till now
const Users = require('./routes/Users');
const Reservations = require('./routes/Reservations');
const Events = require('./routes/Events');
const Hall = require('./routes/Hall');
const app = express();


// connecting to the database
mongoose.connect('mongodb://localhost:27017/Opera',{ useNewUrlParser: true,useUnifiedTopology: true })
  .then(() => console.log('Connected to MongoDB...'))
  .catch(err => console.error('Could not connect to MongoDB...'));

  autoIncrement.initialize(mongoose.connection);

  //limit to allow for large requests with images
  app.use(bodyParser.json({limit: '50mb'})); // support json encoded bodies
  app.use(bodyParser.urlencoded({ extended: false,limit: '50mb' })); // support encoded bodies
  
//app.use(bodyParser.urlencoded({ extended: true }));
// 
app.use('/api/Users', Users);
app.use('/api/Reservations',Reservations);
app.use('/api/Events',Events);
app.use('/api/Hall',Hall);


// the port where the application run
const port = process.env.PORT || 6001;
app.listen(port, () => console.log(`Listening on port ${port}...`));

// importannt Exports
module.exports.app= app;
