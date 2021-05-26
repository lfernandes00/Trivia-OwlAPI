// const db = require("../models/db.js");
// const User = db.user;
// const Historic = db.userHistoric;

// const { Op } = require('sequelize');

// // get user historic
// exports.findAll = async (req, res) => {
//     try {
//         let user = await User.findByPk(req.params.userID);
//         if (user === null) {
//             res.status(404).json({
//                 message: `Not found User with id ${req.params.userID}.`
//             });
//             return;
//         }
//         let historic = await user.getUserHistoric();
//         if (historic.length == 0) {
//             res.status(404).json({
//                 message: `User with id ${req.params.userID} has never completed an activity!`
//             })
//         }
//         else {
//             res.status(200).json(historic);
//         }
        

//     }
//     catch (err) {
//         res.status(500).json({
//             message: err.message || `Error retrieving historic for User with id ${req.params.userID}.`
//         });
//     }
// };

// // add new activity to user historic
// exports.create = (req, res) => {
//     if (!req.body) {
//         res.status(400).json({ message: "Request body can not be empty!" });
//         return;
//     }
//     else if (!req.body.id) {
//         res.status(400).json({message: "Id can not be empty!"});
//         return;
//     }
//     else if (!req.body.name) {
//         res.status(400).json({message: "Name can not be empty!"});
//         return;
//     }
//     else if (!req.body.course) {
//         res.status(400).json({message: "Course can not be empty!"});
//         return;
//     }
//     else if (!req.body.points) {
//         res.status(400).json({message: "Points can not be empty!"});
//         return;
//     }
//     else if (!req.body.userId) {
//         res.status(400).json({message: "userID can not be empty!"});
//         return;
//     }

//     let user = User.findByPk(req.params.userID)

//     if (user === null) {
//         res.status(404).json({message: `Not found User with id ${req.params.userID}!`})
//         return;
//     }

//     console.log(req.body.id, req.body.name, req.params.course, req.params.points, req.params.userId);
//     Historic.create({
//         description: req.body.description, points: req.body.points, userId: req.params.userID
//     })
//         .then(data => {
//             res.status(201).json({
//                 message: "New activity added to historic.", location: "/users/" +
//                     req.params.userID + "/historic/" + data.id
//             });
//         })
//         .catch(err => {
//             if (err.name === 'SequelizeValidationError')
//                 res.status(400).json({ message: err.errors[0].message });
//             else
//                 res.status(500).json({
//                     message: err.message || "Some error occurred while adding the activity to user historic."
//                 });
//         });
// };
