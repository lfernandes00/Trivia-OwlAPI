// get resource model (definition and DB operations)
const db = require("../models/db.js");
const User = db.user;

const { Op } = require('sequelize');

// get all teams
exports.findAll = (req, res) => {
    User.findAll()
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

// get team by id
exports.findOne = (req, res) => {
    User.findByPk(req.params.userID)
        .then(data => {
            if (data === null)
                res.status(404).json({ message: `User with id ${req.params.userID} not found!` })
            else
                res.json(data)
        })
        .catch(err => {
            res.status(500).json({ message: err.message || "Some error occurred while retrieving the user!" })
        })
};

// Remove team
exports.remove = (req, res) => {
    User.destroy({ where: { id: req.params.userID } })
        .then(num => {
            if (num == 1) {
                res.status(200).json({ message: `User with id ${req.params.userID} deleted with success` })
            } else {
                res.status(404).json({ message: `User with id ${req.params.userID} not found!` })
            }
        })
        .catch(err => {
            res.status(500).json({ message: err.message || "Some error occurred while deleting the user!" })
        })
};

// create new team
exports.create = (req, res) => {
    if (!req.body || !req.body.username || !req.body.password || !req.body.name || !req.body.birthDate || !req.body.course || !req.body.level || !req.body.photo || !req.body.type || !req.body.doneActivities || !req.body.points || !req.body.team) {
        res.status(400).json({ message: "Check if all the values are filled!" });
        return;
    }

    User.create(req.body)
        .then(data => {
            res.status(201).json({ message: "New user created", location: "/users" + data.id })
        })
        .catch(err => {
            if (err.name === 'SequelizeValidationError')
                res.status(404).json({ message: err.errors[0].message });
            else
                res.status(500).json({ message: err.message || "Some error occurred while creating the user!" })
        })
};

// Update team informations
exports.update = (req, res) => {
    if (!req.body || !req.body.username || !req.body.password || !req.body.name || !req.body.birthDate || !req.body.course || !req.body.level || !req.body.photo || !req.body.type || !req.body.doneActivities || !req.body.points || !req.body.team) {
        res.status(400).json({ message: "Check if all the values are filled!" });
        return;
    }

    User.update(req.body, { where: { id: req.params.userID } })
        .then(num => {
            if (num == 1) {
                res.status(200).json({
                    message: `User id=${req.params.userID} was updated successfully.`
                });
            } else {
                res.status(200).json({
                    message: `No updates were made on User id=${req.params.userID}.`
                });
            }
        })
};