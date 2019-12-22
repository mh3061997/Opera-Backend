
const mongoose = require('mongoose');
const express = require('express');
const router = express.Router();


const UserSchema = new mongoose.Schema({
    Username: {
        type: String,
        required: true,
        dropDups: true,
        unique: true
    },
    Password: {
        type: String
    },
    FirstName: {
        type: String
    },
    LastName: {
        type: String
    },
    BirthDate: {
        type: Date,
        default: "01/01/2008"
    },
    Gender: {
        type: String
    },
    City: {
        type: String,
    },
    Address: {
        type: String,
    },
    Email: {
        type: String,
        unique: true,
        dropDups: true,
        required: true
    },
    Priv: {
        type: Number,
        default: 3
    }

});


const User = mongoose.model('User', UserSchema);


//Create New User
router.post('/Register', async (req, res) => { //sends post request to /Authors/unFollow End point through the router
    var NewUser = new User();
    console.log(req.body);
    NewUser.Username = req.body.Username;
    NewUser.Password = req.body.Password;
    NewUser.FirstName = req.body.FirstName;
    NewUser.LastName = req.body.LastName;
    NewUser.BirthDate = req.body.BirthDate;
    NewUser.Gender = req.body.Gender;
    NewUser.City = req.body.City;
    NewUser.Address = req.body.Address;
    NewUser.Email = req.body.Email;
    NewUser.Priv = req.body.Priv;

    let check = await User.findOne({ Username: req.body.Username });
    if (check) return res.status(400).send({ "ReturnMsg": "User Already Exits" });

    //if user doesn't exist create him
    NewUser.save((err, doc) => {
        if (!err) {

            res.json({ "UserAdded": true });
        }
        else {
            res.json({ "UserAdded": false });
            console.log('error during user insertion: ' + err);
        }
    });

});


//Get User
router.post('/Login', async (req, res) => { //sends post request to /Authors/unFollow End point through the router


    mongoose.connection.collection("Users").findOne({ AuthorId: req.query.auth_id },
        (err, doc) => {

            if (!doc || err) {
                //console.log(doc);
                res.status(404).json({  // sends a json with 404 code
                    success: false,  // user not retrieved  
                    "Message": "Author ID not  found !"
                });
            }
            else {
                //console.log(doc);
                res.status(200).json(doc);

            }
        }


    )
});



module.exports = router;
// ///////////////////////////////////////////////////////////////////////////////////
// //Find Author by Name 
// /**
// * @api{GET}/api/Author/?auth_name=Value Find an author by name
// * @apiName Find author by name 
// * @apiGroup Author 
// * @apiError {404} name-not-found Author could not be found
// * @apiErrorExample {JSON}
// *HTTP/1.1 404 Not Found
// * {
// * "success": false,
// * "Message":"Author  not  found !"
// * }
// * @apiParam {String} auth_name Author Name
// * @apiSuccess {JSON} Author data for the required Author
// * @apiSuccessExample
// * HTTP/1.1 200 OK
// * 
// {
//        "_id" : ObjectId("5c9284d5e0a57a14e749981a"),
//        "BookId" : [
//                "5c91157331557ebe471e0a12"
//        ],
//        "AuthorId" : "5c91157301d63f812a141932",
//        "AuthorName" : "Alberta Bean",
//        "Photo" : "http://placehold.it/32x32",
//        "FollowingUserId" : [
//                "5c9132dd99a8a3609cca3406",
//                "5c91344d99a8a3609cca3406"
//        ]
//  }
// */



// router.get('/', async (req, res) => {

//     /*
//     console.log(req.params);
//     console.log(req.params.auth_name);
//     console.log(req.query.auth_name); /// ONLY WORKING
//     console.log(req.params.auth_name.auth_name);
//    */


//     mongoose.connection.collection("Authors").findOne({ AuthorName: req.query.auth_name },
//         (err, doc) => {

//             if (!doc || err) {
//                 //console.log(doc);
//                 res.status(404).json({  // sends a json with 404 code
//                     success: false,  // user not retrieved  
//                     "Message": "Author Name not  found !"
//                 });
//             }
//             else {
//                 //console.log(doc);
//                 res.status(200).json(doc);

//             }
//         }


//     )
// });

// /***************************
// //Get info about author by id 
// /**
// * @api{GET}/api/Author/byid/?auth_id=Value Get info about author by id 
// * @apiName Get info about author by id 
// * @apiGroup Author 
// * @apiError {404} id-not-found Author could not be found
// * @apiErrorExample {JSON}
// *HTTP/1.1 404 Not Found
// * {
// * "success": false,
// * "Message":"Author  not  found !"
// * }
// * @apiParam {String} auth_id Author ID
// * @apiSuccess {JSON} Author data for the required Author
// * @apiSuccessExample
// * HTTP/1.1 200 OK
// * 
// {
//       "_id" : ObjectId("5c9284d5e0a57a14e749981a"),
//       "BookId" : [
//               "5c91157331557ebe471e0a12"
//       ],
//       "AuthorId" : "5c91157301d63f812a141932",
//       "AuthorName" : "Alberta Bean",
//       "Photo" : "http://placehold.it/32x32",
//       "FollowingUserId" : [
//               "5c9132dd99a8a3609cca3406",
//               "5c91344d99a8a3609cca3406"
//       ]
// }
// */



// router.get('/byid', async (req, res) => {

//     /*
//     console.log(req.params);
//     console.log(req.params.auth_name);
//     console.log(req.query.auth_name); /// ONLY WORKING
//     console.log(req.params.auth_name.auth_name);
//    */


//     mongoose.connection.collection("Authors").findOne({ AuthorId: req.query.auth_id },
//         (err, doc) => {

//             if (!doc || err) {
//                 //console.log(doc);
//                 res.status(404).json({  // sends a json with 404 code
//                     success: false,  // user not retrieved  
//                     "Message": "Author ID not  found !"
//                 });
//             }
//             else {
//                 //console.log(doc);
//                 res.status(200).json(doc);

//             }
//         }


//     )
// });

// //////////////////////////////////////////////////////////
// ///////////////////////******///////////////////////// */
// //UNFollow Author
// /**
// * 
// * @api {POST}  /api/Authors/unFollow Unfollow an Author
// * @apiName Unfollow Author
// * @apiGroup Author
// * @apiError {404} id-not-found The<code>myuserId</code> was not found.
// * @apiError {404} id-not-found The<code>auth_id</code> was not found.
// * @apiSuccess {200} UNFollow Successful 
// * @apiParam  {String} myuserId GoodReads User ID
// * @apiParam  {String} auth_id GoodReads Author ID
// * 
// * @apiSuccessExample {JSON}
// * HTTP/1.1 200 OK
//   {
//      "success": true,
//      "Message":"Successfully done"
//   }
// *  @apiErrorExample {JSON}
// *  HTTP/1.1 404 Not Found
// * {
// * "success": false,
// * "Message":"Author Id not  found !"
// * }
// *  
// * 
// */

// //UNFollow Author
// router.post('/unFollow', async (req, res) => { //sends post request to /Authors/unFollow End point through the router
//     /* console.log(req.body.auth_id);
//     console.log(req.auth_id);
//     console.log(req.params.auth_id);
//     console.log(req.query.auth_id);  //ONLY WORKINGGGGGGGGGGGG
//     console.log("my"+req.query.myuserId);*/
//     mongoose.connection.collection("Authors").updateOne( // accesses basic mongodb driver to update one document of Authors Collection

//         {
//             AuthorId: req.query.auth_id //access document of Author I want to unfollow
//         },
//         {
//             $pull: { // pull from end of array of the users following this author
//                 FollowingUserId: req.query.myuserId
//             }
//         }
//         , function (err, doc) { // error handling and checking for returned mongo doc after query

//             if (doc.matchedCount == 0 || err)   //matched count checks for number of affected documents by query 
//             {

//                 res.status(404).json({  // sends a json with 404 code
//                     success: false,  // unFollow Failed
//                     "Message": "Author Id not  found !"
//                 });
//             }
//             else {

//                 res.status(200).json({ //sends a json with 200 code
//                     success: true, //unFollow Done 
//                     "Message": "Sucessfully done"
//                 });
//             }
//         });
//     mongoose.connection.collection("Users").updateOne(
//         {
//             UserId: req.query.myuserId//access document of currently logged In user 
//         },
//         {
//             $pull: { // pull from end of array of the Authors that the user follows
//                 FollowingAuthorId: req.query.auth_id
//             }
//         });


// });


// //Follow Author
// /**
// * 
// * @api {POST}  /api/Authors/Follow follow an Author
// * @apiName follow Author
// * @apiGroup Author
// * @apiError {404} id-not-found The<code>myuserId</code> was not found.
// * @apiError {404} id-not-found The<code>auth_id</code> was not found.
// * @apiSuccess {200} UNFollow Successful 
// * @apiParam  {String} myuserId GoodReads User ID
// * @apiParam  {String} auth_id GoodReads Author ID
// * 
// * @apiSuccessExample {JSON}
// * HTTP/1.1 200 OK
//   {
//      "success": true,
//      "Message":"Successfully done"
//   }
// *  @apiErrorExample {JSON}
// *  HTTP/1.1 404 Not Found
// * {
// * "success": false,
// * "Message":"Author Id not  found !"
// * }
// */

// //Follow Author
// router.post('/Follow', async (req, res) => { //sends post request to /Authors/Follow End point through the router
//     /* console.log(req.body.auth_id);
//     console.log(req.auth_id);
//     console.log(req.params.auth_id);*/
//     // console.log(req.query.auth_id);  //ONLY WORKINGGGGGGGGGGGG
//     //console.log("my"+req.query.myuserId);
//     mongoose.connection.collection("Authors").updateOne( // accesses basic mongodb driver to update one document of Authors Collection

//         {
//             AuthorId: req.query.auth_id //access document of Author I want to follow
//         },
//         {
//             $push: { // push to end of array of the users following this author
//                 FollowingUserId: req.query.myuserId
//             }
//         }
//         , function (err, doc) { // error handling and checking for returned mongo doc after query

//             if (doc.matchedCount == 0 || err)   //matched count checks for number of affected documents by query 
//             {

//                 res.status(404).json({  // sends a json with 404 code
//                     success: false,  // Follow Failed
//                     "Message": "Author Id not  found !"
//                 });
//             }
//             else {

//                 res.status(200).json({ //sends a json with 200 code
//                     success: true, //Follow Done 
//                     "Message": "Sucessfully done"
//                 });
//             }
//         });
//     mongoose.connection.collection("Users").updateOne(
//         {
//             UserId: req.query.myuserId//access document of currently logged In user 
//         },
//         {
//             $push: { // push to end of array of the Authors that the user follows
//                 FollowingAuthorId: req.query.auth_id
//             }
//         });


// });

