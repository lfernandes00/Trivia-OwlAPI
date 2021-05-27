const db = require("../models/db.js");
const User = db.user;
const Trophy = db.userTrophie;

const { Op } = require('sequelize');

// get all user trophies
exports.findAll = async (req, res) => {
    try {
        let user = await User.findByPk(req.params.userID);
        if (user === null) {
            res.status(404).json({
                message: `Not found User with id ${req.params.userID}.`
            });
            return;
        }
        console.log(user)


        let trophies = await user.getUserTrophies();
        console.log(trophies);
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
exports.create = async (req, res) => {
    try {
        let user = await User.findByPk(req.params.userID);

        if (user == null) {
            res.status(404).json({
                message: `Not found user with id ${req.params.userID}`
            });
            return;
        }

        let newTrophy = {
            userId: req.params.userID,
            trophyId: req.body.trophyId
        }

        let trophy = await Trophy.create(newTrophy)
        await user.addUserTrophie(trophy)

        res.status(201).json({ message: "New Trophy created.", location: "/users/" + req.params.userID + "/trophies/" + trophy.id })
    }
    catch (err) {
        if (err.name === 'SequelizeValidationError')
            res.status(400).json({ message: err.errors[0].message });
        else
            res.status(500).json({
                message: err.message || "Some error occurred while creating the trophy."
            });
    }
};
