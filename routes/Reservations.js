const mongoose = require("mongoose");
const express = require("express");
const router = express.Router();
const Event = require("./Models/Event").Event;
const ReservationSchema = new mongoose.Schema(
  {
    ReservationId: {
      type: String,
      unique: true
    },
    Username: {
      type: String
    },
    EventId: {
      type: String
    },
    CreditCardNumber: {
      type: String
    },
    Seats: [
      {
        type: String
      }
    ]
  },
  { collection: "Reservations" }
);
const Reservation = mongoose.model("Reservation", ReservationSchema);

//get reservation by EventID
router.get("/", async (req, res) => {
  /*
  console.log(req.params);
  console.log(req.params.auth_name);
  console.log(req.query.auth_name); /// ONLY WORKING
  console.log(req.params.auth_name.auth_name);
 */
  //console.log(req.query.ReservationId); /// ONLY WORKING

  Reservation.find({EventId:req.query.EventId},(err, doc) => {

    if (!doc || err) {

        // console.log(doc);
        res.status(400).json({  // sends a json with 404 code
            success: false,  // user not retrieved  
            "Message": "No Reservations available!"
        });
    }
    else {
        console.log(doc);
        res.send(doc);

    }
})
});
// //get reservation by EventID
// router.get("/", async (req, res) => {
//   /*
//   console.log(req.params);
//   console.log(req.params.auth_name);
//   console.log(req.query.auth_name); /// ONLY WORKING
//   console.log(req.params.auth_name.auth_name);
//  */
//   //console.log(req.query.ReservationId); /// ONLY WORKING

//   mongoose.connection
//     .collection("Reservations")
//     .findOne({ EventId: req.params.ids }, (err, doc) => {
//       if (!doc || err) {
//         //console.log(doc);
//         res.status(400).json({
//           // sends a json with 404 code
//           success: false, // user not retrieved
//           Message: "Reservation not  found !"
//         });
//       } else {
//         //console.log(doc);
//         res.status(200).json(doc);
//       }
//     });
// });

//Create New Reservation
router.post("/Create", async (req, res) => {
  var NewReservation = new Reservation();
  console.log(req.body);
  console.log(req.body.Seats);
  NewReservation.ReservationId = req.body.ReservationId;
  NewReservation.Username = req.body.Username;
  NewReservation.EventId = req.body.EventId;
  NewReservation.CreditCardNumber = req.body.CreditCardNumber;
  NewReservation.Seats = req.body.Seats; //array of seat numbers
  console.log(NewReservation.Seats);

  //TODO :UPDATE EVENT SEATS AS RESERVED
  //Seats provided here are already checked by frontend to be vacant
  let ifevent = await Event.findOne({ EventId: req.body.EventId });
  if (!ifevent)
    return res.status(400).json({ Message: "Invalid Event Id Number" });

  console.log(ifevent);
  //iterate on all seats
  NewReservation.Seats.forEach(seatnum => {
    ifevent.Seats[parseInt(seatnum)].IsReserved = true;
  });
  //remove old event
  await Event.remove({ EventId: ifevent.EventId });
  //add updated Event
  await Event.insertMany(ifevent);

  NewReservation.save((err, doc) => {
    if (!err) {
      res.json({ "Reservation Added": true });
    } else {
      res.json({ "Reservation Added": false, error: err });
      // console.log('error during user insertion: ' + err);
    }
  });
});

//Remove Reservation by EventID and Username
router.post("/Remove", async (req, res) => {
  let isfound = await Reservation.findOne({
    Username: req.body.Username,
    EventId: req.body.EventId
  });
  if (!isfound)
    res.status(400).send({ ReturnedMsg: "Reservation doesn't exist" });

  let check = await Reservation.remove({
    Username: req.body.Username,
    EventId: req.body.EventId
  });
  if (check) return res.status(200).send({ ReturnMsg: "Reservation Removed" });
  else res.status(400).send({ ReturnedMsg: "error not removed" });
});

module.exports = router;
