const db = require("../models/db.js");
const Team = db.team;
const Member = db.member;
const Trophie = db.trophie;

const { Op } = require('sequelize');

exports.findAll = (req, res) => {
    Trophie.findAll({where: {teamId: req.params.teamID}})
        .then(data => {
            res.status(200).json(data);
        })
        .catch(err => {
            res.status(500).json({
                message:
                    err.message || "Some error occurred while retrieving teams."
            });
        });
};

exports.create = (req, res) => {
    if (!req.body || !req.body.description || !req.body.points) {
        res.status(400).json({ message: "Check if all the values are filled!" });
        return;
    }

    console.log(req.body.description, req.body.points, req.params.teamID);
    // Save Comment in the database
    Trophie.create({
        description: req.body.description, points: req.body.points, teamId: req.params.teamID
    })
        .then(data => {
            res.status(201).json({
                message: "New trophie created.", location: "/teams/" +
                    req.params.teamID + "/trophies/" + data.id
            });
        })
        .catch(err => {
            if (err.name === 'SequelizeValidationError')
                res.status(400).json({ message: err.errors[0].message });
            else
                res.status(500).json({
                    message: err.message || "Some error occurred while creating the trophie."
                });
        });
};

exports.delete = (req, res) => {
    console.log(req.params.teamID, req.params.trophieID);
    // Save Comment in the database
    Trophie.destroy({ where: { id: req.params.trophieID, teamId: req.params.teamID } })
        .then(num => {
            if (num == 1) {
                res.status(200).json({ message: `Trophie with id ${req.params.trophieID} deleted with success` })
            } else {
                res.status(404).json({ message: `Trophie with id ${req.params.trophieID} not found!` })
            }
        })
        .catch(err => {
            res.status(500).json({ message: err.message || "Some error occurred while deleting the trophie!" })
        })
};