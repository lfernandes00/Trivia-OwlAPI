// get resource model (definition and DB operations)
const db = require("../models/db.js");
const userTrophie = db.userTrophy
const Trophy = db.Trophy;

const { Op } = require('sequelize');
const { user } = require("../models/db.js");

// get all trophies
exports.findAll = (req, res) => {
    Trophy.findAll({
        include: [
            {
                model: userTrophy, attributes: ["userId"] // remove ALL data retrieved from join table
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

// create new trophy
exports.create = (req, res) => {

    const newTrophy = {
        desc: req.body.desc,
        points: req.body.points
    }

    Trophy.create(newTrophy)
        .then(data => {
            res.status(201).json({ message: "New trophy created", location: "/trophies" + data.id })
        })
        .catch(err => {
            if (err.name === 'SequelizeValidationError')
                res.status(404).json({ message: err.errors[0].message });
            else
                res.status(500).json({ message: err.message || "Some error occurred while creating the trophy!" })
        })
};
