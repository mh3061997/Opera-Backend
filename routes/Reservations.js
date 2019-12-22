
const mongoose = require('mongoose');
const express = require('express');
const router = express.Router();


//get reservation by id
router.get('/', async (req,res) => {

    /*
    console.log(req.params);
    console.log(req.params.auth_name);
    console.log(req.query.auth_name); /// ONLY WORKING
    console.log(req.params.auth_name.auth_name);
   */
  console.log(req.query.ReservationId); /// ONLY WORKING

  
    mongoose.connection.collection("Reservations").findOne({ReservationId:req.query.ReservationId},
    (err,doc) =>{
     
      if(!doc || err)
      {
        //console.log(doc);
        res.status(400).json({  // sends a json with 404 code
          success: false ,  // user not retrieved  
           "Message":"Reservation not  found !"});
      }
       else
       {
       //console.log(doc);
       res.status(200).json(doc);
      
       }
      }
  
  
    )}); 
    
//
    router.get('/', async (req,res) => {

        /*
        console.log(req.params);
        console.log(req.params.auth_name);
        console.log(req.query.auth_name); /// ONLY WORKING
        console.log(req.params.auth_name.auth_name);
       */
      console.log(req.query.ReservationId); /// ONLY WORKING
    
      
        mongoose.connection.collection("Reservations").findOne({ReservationId:req.query.ReservationId},
        (err,doc) =>{
         
          if(!doc || err)
          {
            //console.log(doc);
            res.status(400).json({  // sends a json with 404 code
              success: false ,  // user not retrieved  
               "Message":"Reservation not  found !"});
          }
           else
           {
           //console.log(doc);
           res.status(200).json(doc);
          
           }
          }
      
      
        )}); 
        
  module.exports = router;