// get resource model (definition and DB operations)
const db = require("../models/db.js");
const Team = db.team;

const { Op } = require('sequelize');
// EXPORT function to display list of all teams (required by ROUTER)
exports.findAll = (req, res) => {
    Team.findAll()
        .then(data => {
            res.status(200).json(data)
        })
        .catch(err => {
            res.status(500).json({message: err.message || "Some error occurred while retrieving teams!"})
        })
};

exports.findOne = (req, res) => {
    Team.findByPk(req.params.teamID)
        .then(data => {
            if (data === null) 
                res.status(404).json({message: `Team with id ${req.params.teamID} not found!`})
            else 
                res.json(data)
        })
        .catch(err => {
            res.status(500).json({message: err.message || "Some error occurred while retrieving the team!"})
        })
};

exports.remove = (req, res) => {
    Team.destroy({where: {id: req.params.teamID}})
        .then(num => {
            if (num == 1) {
                res.status(200).json({message: `Team with id ${req.params.teamID} deleted with success`})
            } else {
                res.status(404).json({message: `Team with id ${req.params.teamID} not found!`})
            }
        })
        .catch(err => {
            res.status(500).json({message: err.message || "Some error occurred while deleting the team!"})
        })
};

exports.create = (req, res) => {
    Team.create(req.body)
        .then(data => {
            res.status(200).json({message: "New team created", location: "/teams" + data.id})
        })
        .catch(err => {
            if (err.name === 'SequelizeValidationError')
                res.status(404).json({message: err.errors[0].message});
            else
                res.status(500).json({message: err.message || "Some error occurred while creating the team!"})
        })
};

exports.update = (req, res) => {
    // // Validate request
    // if (!req.body || !req.body.name) {
    //     res.status(400).json({ message: "Request must have specify the new name!" });
    //     return;
    // }

    // const team = {
    //     name: req.body.name,
    //     creater: req.body.creater,
    //     photo: req.body.photo,
    //     level: req.body.level,
    //     points: req.body.points
    // }

    // // Update Tutorial in the database
    // Team.updateById(req.params.teamID, team, (err, data) => {
    //     if (err) {
    //         if (err.kind === "not_found") {
    //             res.status(404).json({
    //                 message: `Not found Team with id ${req.params.teamID}.`
    //             });
    //         } else {
    //             res.status(500).json({
    //                 message: "Error updating Team with id " + req.params.teamID
    //             });
    //         }
    //     } else res.status(200).json({ message: "Updated team.", location: `/teams/${req.params.teamID}` });
    // });
};