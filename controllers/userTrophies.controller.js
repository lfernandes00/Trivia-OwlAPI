const db = require("../models/db.js");
const User = db.user;
const Trophie = db.userTrophie;

const { Op } = require('sequelize');

// get all team trophies
exports.findAll = (req, res) => {
    console.log(req.params.userID)
    Trophie.findAll({where: {userId: req.params.userID}})
    
        .then(data => {
            res.status(200).json(data);
        })
        .catch(err => {
            res.status(500).json({
                message:
                    err.message || "Some error occurred while retrieving user trophies."
            });
        });
};

// add new trophie
exports.create = (req, res) => {
    if (!req.body) {
        res.status(400).json({ message: "Request body can not be empty!" });
        return;
    }
    else if (!req.body.description) {
        res.status(400).json({message: "Description can not be empty!"});
        return;
    }
    else if (!req.body.points) {
        res.status(400).json({message: "Points can not be empty!"});
        return;
    }

    console.log(req.body.description, req.body.points, req.params.userID);
    // Save Comment in the database
    Trophie.create({
        description: req.body.description, points: req.body.points, userId: req.params.userID
    })
        .then(data => {
            res.status(201).json({
                message: "New trophie created.", location: "/users/" +
                    req.params.userID + "/trophies/" + data.id
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