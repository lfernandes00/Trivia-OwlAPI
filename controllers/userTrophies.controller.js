const db = require("../models/db.js");
const User = db.user;
const Trophie = db.userTrophie;

const { Op } = require('sequelize');

// get all team trophies
exports.findAll = async (req, res) => {
    try {
        let user = await User.findByPk(req.params.userID);
        if (user === null) {
            res.status(404).json({
                message: `Not found User with id ${req.params.userID}.`
            });
            return;
        }
        let trophies = await user.getUserTrophies();
        if (trophies.length == 0) {
            res.status(404).json({
                message: `User with id ${req.params.userID} has no trophies!`
            })
        }
        else {
            res.status(200).json(trophies);
        }
        

    }
    catch (err) {
        res.status(500).json({
            message: err.message || `Error retrieving Trophies for User with id ${req.params.userID}.`
        });
    }
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

    let user = User.findByPk(req.params.userID)

    if (user === null) {
        res.status(404).json({message: `Not found User with id ${req.params.id}!`})
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
