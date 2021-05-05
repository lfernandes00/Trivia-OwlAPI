// get resource model (definition and DB operations)
const db = require("../models/db.js");
const Team = db.team;

const { Op } = require('sequelize');

exports.findAll = (req, res) => {
    Team.findAll()
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

exports.findOne = (req, res) => {
    Team.findByPk(req.params.teamID)
        .then(data => {
            if (data === null)
                res.status(404).json({ message: `Team with id ${req.params.teamID} not found!` })
            else
                res.json(data)
        })
        .catch(err => {
            res.status(500).json({ message: err.message || "Some error occurred while retrieving the team!" })
        })
};

exports.remove = (req, res) => {
    Team.destroy({ where: { id: req.params.teamID } })
        .then(num => {
            if (num == 1) {
                res.status(200).json({ message: `Team with id ${req.params.teamID} deleted with success` })
            } else {
                res.status(404).json({ message: `Team with id ${req.params.teamID} not found!` })
            }
        })
        .catch(err => {
            res.status(500).json({ message: err.message || "Some error occurred while deleting the team!" })
        })
};

exports.create = (req, res) => {
    if (!req.body || !req.body.name || !req.body.creater || !req.body.photo || !req.body.level || !req.body.points) {
        res.status(400).json({ message: "Check if all the values are filled!" });
        return;
    }

    Team.create(req.body)
        .then(data => {
            res.status(201).json({ message: "New team created", location: "/teams" + data.id })
        })
        .catch(err => {
            if (err.name === 'SequelizeValidationError')
                res.status(404).json({ message: err.errors[0].message });
            else
                res.status(500).json({ message: err.message || "Some error occurred while creating the team!" })
        })
};

exports.update = (req, res) => {
    if (!req.body || !req.body.name || !req.body.creater || !req.body.photo || !req.body.level || !req.body.points) {
        res.status(400).json({ message: "Check if all the values are filled!" });
        return;
    }

    Team.update(req.body, { where: { id: req.params.teamID } })
        .then(num => {
            if (num == 1) {
                res.status(200).json({
                    message: `Team id=${req.params.teamID} was updated successfully.`
                });
            } else {
                res.status(200).json({
                    message: `No updates were made on Team id=${req.params.teamID}.`
                });
            }
        })
};