const mongoose = require("mongoose");
const express = require("express");
const router = express.Router();
const autoIncrement = require("mongoose-auto-increment");
//autoIncrement.initialize(mongoose.connection)
const Hall = require("./Models/Hall").Hall;

//Create New Hall
router.post("/Create", async (req, res) => {
  //sends post request to /Authors/unFollow End point through the router
  var NewHall = new Hall();
  // console.log(req.body);
  NewHall.HallId = parseInt(req.body.HallId);
  NewHall.SeatsCount = req.body.SeatsCount;

  var ifHall = await Hall.findOne({ HallId: req.body.HallId });
  //console.log(ifHall);

  NewHall.save((err, doc) => {
    if (doc || !err) {
      res.json({ "Hall Added ": true });
    } else {
      res.json({ "Hall Added ": false, "error during user insertion: ": err });
      // console.log('error during user insertion: ' + err);
    }
  });
});

//Update Hall
router.post("/Update", async (req, res) => {
  let check = await Hall.findOneAndUpdate(
    { HallId: req.body.HallId },
    { SeatsCount: req.body.SeatsCount }
  );
  if (check) return res.status(200).send({ ReturnMsg: "Hall  Updated" });
  else res.status(400).send({ ReturnedMsg: "error not updated" });
});

//get all events
router.get("/", async (req, res) => {
  /*
    console.log(req.params);
    console.log(req.params.auth_name);
    console.log(req.query.auth_name); /// ONLY WORKING
    console.log(req.params.auth_name.auth_name);
   */
  //console.log(req.query.ReservationId); /// ONLY WORKING
  var newEvent = new Event();

  Event.findOne({}, (err, doc) => {
    if (!doc || err) {
      // console.log(doc);
      res.status(400).json({
        // sends a json with 404 code
        success: false, // user not retrieved
        Message: "No Events available!"
      });
    } else {
      console.log(doc);
      res.send(doc);
    }
  });
});

module.exports = router;
