// get resource model (definition and DB operations)
const db = require("../models/db.js");
const User = db.user;
const Score = db.activityScore;
const Trophy = db.userTrophy;

const { Op } = require('sequelize');
const { user } = require("../models/db.js");
// const userTrophie = require("../models/db.js");
const userType = db.userType

// get all users
exports.findAll = (req, res) => {
    User.findAll({
        include: [
            {
                model: userType, attributes: ["type"] // remove ALL data retrieved from join table
            }
        ]
    })
        .then(data => {
            res.status(200).json(data);
        })
        .catch(err => {
            res.status(500).json({
                message:
                    err.message || "Some error occurred while retrieving users."
            });
        });
};

// get team by id
exports.findOne = (req, res) => {
    User.findByPk(req.params.userID, {
        include: [
            {
                model: userType, attributes: ["type"] // remove ALL data retrieved from join table
            },
            {
                model: Score, attributes: ["activityId"] // user historic
            },
            {
                model: Trophy, attributes: ["trophyId"] // user trophies
            }
        ]
    })
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

// Remove user
exports.remove = (req, res) => {
    User.destroy({ where: { id: req.params.userID } })
        .then(num => {
            if (num == 1) {
                userType.destroy({ where: { userId: req.params.userID } })
                res.status(200).json({ message: `User with id ${req.params.userID} deleted with success` })
            } else {
                res.status(404).json({ message: `User with id ${req.params.userID} not found!` })
            }
        })
        .catch(err => {
            res.status(500).json({ message: err.message || "Some error occurred while deleting the user!" })
        })
};

// create new user
exports.create = (req, res) => {

    const newUser = {
        username: req.body.username,
        password: req.body.password,
        name: req.body.name,
        birthDate: req.body.birthDate,
        course: req.body.course,
        level: req.body.level,
        photo: req.body.photo,
        doneActivities: req.body.doneActivities,
        points: req.body.points,
        teamId: req.body.teamId,
        pending: req.body.pending
    }

    User.create(newUser)
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