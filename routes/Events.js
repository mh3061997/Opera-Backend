
const mongoose = require('mongoose');
const express = require('express');
const router = express.Router();

const EventSchema = new mongoose.Schema({
    EventName: {
        type: String,
        required: true,
        dropDups: true
    },
    Description: {
        type: String
    },
    EventPoster: {
        type: String
    },
    Datetime: {
        type: Date,
        default: "01/01/2008"
    },
    HallNumber: {
        type: String
    },
    EventId: {
        type: String,
    },
    Seats: [{
        SeatNumber:String,
        IsReserved:Boolean
    }]

});
const Event = mongoose.model('Event', EventSchema);

//get all events
router.get('/', async (req, res) => {

    /*
    console.log(req.params);
    console.log(req.params.auth_name);
    console.log(req.query.auth_name); /// ONLY WORKING
    console.log(req.params.auth_name.auth_name);
   */
    //console.log(req.query.ReservationId); /// ONLY WORKING
    var newEvent= new Event();

     Event.findOne({}, (err, doc) => {

            if (!doc || err) {

                // console.log(doc);
                res.status(400).json({  // sends a json with 404 code
                    success: false,  // user not retrieved  
                    "Message": "No Events available!"
                });
            }
            else{
                console.log(doc);
                res.send(doc);
 
            }
        }


    )
});

module.exports = router;