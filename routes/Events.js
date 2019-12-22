
const mongoose = require('mongoose');
const express = require('express');
const router = express.Router();
const autoIncrement = require('mongoose-auto-increment');
const Hall=require('./Models/Hall').Hall;
const Event=require('./Models/Event').Event;
//autoIncrement.initialize(mongoose.connection);



//Create New Event
router.post('/Create', async (req, res) => { //sends post request to /Authors/unFollow End point through the router
    var NewEvent = new Event();
    // console.log(req.body);
    NewEvent.EventName = req.body.EventName;
    NewEvent.Description = req.body.Description;
    NewEvent.EventPoster = req.body.EventPoster;
    NewEvent.Datetime = req.body.Datetime;
    NewEvent.HallId = req.body.HallId;
    NewEvent.EventId = parseInt(req.body.EventId);

    //console.log(req.body);
    var ifHall = await Hall.findOne({ HallId: req.body.HallId });
    //console.log(ifHall);
    if (ifHall)
        SeatsCount = parseInt(ifHall.SeatsCount);
    else
        return res.status(400).json({ Msg: "Invalid Hall Number" });

    var SeatTempArray = new Array();
    console.log(SeatsCount);
    for (var i = 1; i <= SeatsCount; i++) {
        let obj = {
            SeatNumber: i,
            IsReserved: false
        };
        console.log(obj);
        SeatTempArray.push(obj);
    }
    console.log(SeatTempArray);
    NewEvent.Seats = SeatTempArray;


    //Create Event in Db
    NewEvent.save((err, doc) => {
        if (doc || !err) {

            res.json({ "Event Added ": true });
        }
        else {
            res.json({ "Event Added ": false, 'error during user insertion: ': err });
            // console.log('error during user insertion: ' + err);
        }
    });

});


//Remove Event
router.post('/Remove', async (req, res) => { //sends post request to /Authors/unFollow End point through the router

    let check = await Event.remove({ EventId: req.body.EventId });
    if (check) return res.status(200).send({ "ReturnMsg": "Event Removed" });
    else
        res.status(400).send({ "ReturnedMsg": "error not removed" });

});



//Update Event Poster by EventID
router.post('/UpdatePoster', async (req, res) => { //sends post request to /Authors/unFollow End point through the router

    let check = await Event.findOneAndUpdate({ EventId: req.body.EventId }, {
       
        EventPoster : req.body.EventPoster
        //Datetime not updatable only at creation
        //EventId unique not updatable

     

    });
    if (check) return res.status(200).send({ "ReturnMsg": "Event Poster  Updated" });
    else
        res.status(400).send({ "ReturnedMsg": "error not updated" });
   


});


//Update Event Details
router.post('/Update', async (req, res) => { //sends post request to /Authors/unFollow End point through the router

        //TODO: ADD CHECK HALLNUMBER AND UPDATE SEATS 
      //console.log(req.body);
      var ifHall = await Hall.findOne({ HallId: req.body.HallId });
      //console.log(ifHall);
      if (ifHall)
          SeatsCount = parseInt(ifHall.SeatsCount);
      else
          return res.status(400).json({ Msg: "Invalid Hall Number" });
  
      var SeatTempArray = new Array();
      console.log(SeatsCount);
      for (var i = 1; i <= SeatsCount; i++) {
          let obj = {
              SeatNumber: i,
              IsReserved: false
          };
          console.log(obj);
          SeatTempArray.push(obj);
      }
      console.log(SeatTempArray);
     
    

      
    let check = await Event.findOneAndUpdate({ EventId: req.body.EventId }, {
        EventName : req.body.EventName,
        Description : req.body.Description,
        EventPoster : req.body.EventPoster,
        HallNumber : req.body.HallNumber,
        Seats:SeatTempArray
        //Datetime not updatable only at creation
        //EventId unique not updatable
    });
    if (check) return res.status(200).send({ "ReturnMsg": "Event  Updated" });
    else
        res.status(400).send({ "ReturnedMsg": "error not updated" });
   


});

//Get all events
router.get('/', async (req, res) => {

    /*
    console.log(req.params);
    console.log(req.params.auth_name);
    console.log(req.query.auth_name); /// ONLY WORKING
    console.log(req.params.auth_name.auth_name);
   */
    //console.log(req.query.ReservationId); /// ONLY WORKING
    var newEvent = new Event();

    Event.find((err, doc) => {

        if (!doc || err) {

            // console.log(doc);
            res.status(400).json({  // sends a json with 404 code
                success: false,  // user not retrieved  
                "Message": "No Events available!"
            });
        }
        else {
            console.log(doc);
            res.send(doc);

        }
    }


    )
});

module.exports = router;