// IMportant requires 
const mongoose = require('mongoose');
const express = require('express');
const bodyParser = require('body-parser');

// the routes used till now
const Users = require('./routes/Users');
const Reservations = require('./routes/Reservations');
const Events = require('./routes/Events');
const app = express();


// connecting to the database
mongoose.connect('mongodb://localhost:27017/Opera',{ useNewUrlParser: true,useUnifiedTopology: true })
  .then(() => console.log('Connected to MongoDB...'))
  .catch(err => console.error('Could not connect to MongoDB...'));

  app.use(bodyParser.json()); // support json encoded bodies
  app.use(bodyParser.urlencoded({ extended: false })); // support encoded bodies
  
//app.use(bodyParser.urlencoded({ extended: true }));
// 
app.use('/api/Users', Users);
app.use('/api/Reservations',Reservations);
app.use('/api/Events',Events);


// the port where the application run
const port = process.env.PORT || 6001;
app.listen(port, () => console.log(`Listening on port ${port}...`));

// importannt Exports
module.exports.app= app;
