// get resource model (definition and DB operations)
const db = require("../models/db.js");
const userTrophie = db.userTrophy
const Trophy = db.trophy;
const User = db.user;

const { Op } = require('sequelize');
const { user } = require("../models/db.js");

// get all trophies
exports.findAll = (req, res) => {
    Trophy.findAll({
        include: [
            {
                model: User, attributes: ["id"] // remove ALL data retrieved from join table
            }
        ]
    })
        .then(data => {
            res.status(200).json(data);
        })
        .catch(err => {
            res.status(500).json({
                message:
                    err.message || "Some error occurred while retrieving trophies."
            });
        });
};

// Add one trophy to one user
exports.create = (req, res) => {
    Trophy.findByPk(req.body.trophyId)
        .then(trophy => {
            // no data returned means there is no tutorial in DB with that given ID 
            if (trophy === null)
                res.status(404).json({
                    message: `Not found Trophy with id ${req.body.trophyId}.`
                });
            else {
                User.findByPk(req.params.userID)
                    .then(user => {
                        // no data returned means there is no tag in DB with that given ID 
                        if (user === null)
                            res.status(404).json({
                                message: `Not found User with id ${req.params.userID}.`
                            });
                        else {
                            user.addTrophy(trophy)
                                .then(data => {
                                    // console.log(data);
                                    if (data === undefined)
                                        res.status(200).json({
                                            message: `User ${req.params.userID} was already assigned to Trophy ${req.body.trophyId}.`
                                        });
                                    else
                                        res.status(200).json({
                                            message: `Added User ${req.params.userID} to Trophy ${req.body.trophyId}.`
                                        });
                                })
                        }
                    })
            }
        })
        .catch(err => {
            res.status(500).json({
                message: err.message || `Error adding USer ${req.params.userID} to Trophy ${req.body.trophyId}.`
            });
        });
};