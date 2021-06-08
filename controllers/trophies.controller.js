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

// Add one user to one trophy
exports.create = (req, res) => {
    Trophy.findByPk(req.body.trophyId)
        .then(trophy => {
            if (trophy === null)
               return res.status(404).json({
                    message: `Not found Trophy with id ${req.body.trophyId}.`
                });
            else {
                User.findByPk(req.body.userId)
                    .then(user => {
                        if (user === null)
                            return res.status(404).json({
                                message: `Not found User with id ${req.body.userId}.`
                            });
                        else {
                            user.addTrophie(trophy)
                                .then(data => {
                                    // console.log(data);
                                    if (data === undefined)
                                        return res.status(200).json({
                                            message: `User ${req.body.userId} was already assigned to Trophy ${req.body.trophyId}.`
                                        });
                                    else
                                       return  res.status(201).json({
                                            message: `Added User ${req.body.userId} to Trophy ${req.body.trophyId}.`
                                        });
                                })
                        }
                    })
            }
        })
        .catch(err => {
            res.status(500).json({
                message: err.message || `Error adding USer ${req.body.userId} to Trophy ${req.body.trophyId}.`
            });
        });
};