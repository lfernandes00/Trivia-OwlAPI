// get resource model (definition and DB operations)
const db = require("../models/db.js");
const User = db.user;
const Activity = db.activity;
const Trophy = db.trophy;
const Type = db.userType;

const { Op } = require('sequelize');
const { user } = require("../models/db.js");
// const userTrophie = require("../models/db.js");


// get all users for admin
exports.findAll = (req, res) => {
    User.findAll({where: {typeId: [2,3]},
        include: [
            {
                model: Type, attributes: ["name"] // remove ALL data retrieved from join table
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

// find all students for classification
exports.findAllStudents = (req, res) => {
    User.findAll({where: {typeId: 2}})
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

// get user by id
exports.findOne = (req, res) => {
    User.findByPk(req.params.userID, {
        include: [
            {
                model: Type, attributes: ["name"] // remove ALL data retrieved from join table
            },
            {
                model: Activity, as: 'Scores', attributes: ["id", "name", "course", "points"] 
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
                res.status(200).json({ message: `User with id ${req.params.userID } deleted with success` })
            } else {
                res.status(404).json({ message: `User with id ${req.params.userID } not found!` })
            }
        })
        .catch(err => {
            res.status(500).json({ message: err.message || "Some error occurred while deleting the user!" })
        })
};

// Update user informations
exports.update = (req, res) => {

    User.update(req.body, { where: { id: req.params.userID } })
        .then(num => {
            if (num == 1) {
                res.status(200).json({
                    message: `User id=${req.params.userID} was updated successfully.`
                });
            } else {
                res.status(404).json({
                    message: `No updates were made on User id=${req.params.userID}.`
                });
            }
        })
};

// update user points and doneActivities
exports.updateUser = (req, res) => {
    // validate request body data
    if (!req.body || !req.body.doneActivities || !req.body.points) {
        res.status(400).json({ message: "Request can not be empty!" });
        return;
    }

    User.findByPk(req.body.userId)
        .then(user => {
            // no data returned means there is no user in DB with that given ID 
            if (user === null)
                res.status(404).json({
                    message: `Not found User with id ${req.body.userId}.`
                });
            else {
                User.update(req.body, { where: { id: req.body.userId } })
                    .then(num => {
                        if (num == 1) {
                            res.status(200).json({
                                message: `User id=${req.body.userId} was updated successfully.`
                            });
                        } else {
                            res.status(200).json({
                                message: `No updates were made on User id=${req.body.userId}.`
                            });
                        }
                    })
            }
        })
        .catch(err => {
            res.status(500).json({
                message: `Error updating User with id=${req.body.userId}.`
            });
        });
};