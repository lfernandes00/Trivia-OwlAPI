// const db = require("../models/db.js");
// const Team = db.team;
// const Member = db.teamMember;

// const { Op } = require('sequelize');

// // Get all members
// exports.findAll = async (req, res) => {
//     try {
//         let team = await Team.findByPk(req.params.teamID);
//         if (team === null) {
//             res.status(404).json({
//                 message: `Not found Team with id ${req.params.teamID}.`
//             });
//             return;
//         }
//         let members = await team.getTeamMembers();
//         res.status(200).json(members);

//     }
//     catch (err) {
//         res.status(500).json({
//             message: err.message || `Error retrieving Comments for Team with id ${req.params.teamID}.`
//         });
//     }
// };

// // Add new member
// exports.create = async (req, res) => {
//     console.log(req.body.username, req.body.name, req.body.course, req.params.teamID);

//     if (!req.body) {
//         res.status(400).json({ message: "Request body can not be empty!" });
//         return;
//     }
//     else if (!req.body.username) {
//         res.status(400).json({message: "Username can not be empty!"})
//         return;
//     }
//     else if (!req.body.name) {
//         res.status(400).json({message: "Name can not be empty!"})
//         return;
//     }
//     else if (!req.body.course) {
//         res.status(400).json({message: "Course can not be empty!"})
//         return;
//     }

//     let team = await Team.findByPk(req.params.teamID);
//     // console.log(team)
//     if (team === null) {
//         // console.log('null')
//         res.status(404).json({
//             message: `Not found Team with id ${req.params.teamID}.`
//         });
//         return;
//     }
//     else {
//         // console.log('not null')
//         Member.create({
//             username: req.body.username, name: req.body.name, course: req.body.course, teamId: req.params.teamID
//         })
//             .then(data => {
//                 res.status(201).json({
//                     message: "New member created.", location: "/teams/" +
//                         req.params.teamID + "/members/" + data.id
//                 });
//             })
//             .catch(err => {
//                 if (err.name === 'SequelizeValidationError')
//                     res.status(400).json({ message: err.errors[0].message });
//                 else
//                     res.status(500).json({
//                         message: err.message || "Some error occurred while creating the Member."
//                     });
//             });
//     }
// };

// // Delete member
// exports.delete = async (req, res) => {
//     console.log(req.params.teamID, req.params.memberID);
//     let team = await Team.findByPk(req.params.teamID);
//     // console.log(team)
//     if (team === null) {
//         // console.log('null')
//         res.status(404).json({
//             message: `Not found Team with id ${req.params.teamID}.`
//         });
//         return;
//     }
//     else {
//         // console.log('not null')
//         Member.destroy({ where: { id: req.params.memberID, teamId: req.params.teamID } })
//             .then(num => {
//                 if (num == 1) {
//                     res.status(200).json({ message: `Member with id ${req.params.memberID} deleted with success` })
//                 } else {
//                     res.status(404).json({ message: `Member with id ${req.params.memberID} not found!` })
//                 }
//             })
//             .catch(err => {
//                 res.status(500).json({ message: err.message || "Some error occurred while deleting the member!" })
//             })
//     }
// };