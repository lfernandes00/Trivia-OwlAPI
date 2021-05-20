const db = require("../models/db.js");
const Team = db.team;
const Member = db.teamMember;
const Trophie = db.teamTrophie;

const { Op } = require('sequelize');

// get all team trophies
exports.findAll = async (req, res) => {
    try {
        let team = await Team.findByPk(req.params.teamID);
        if (team === null) {
            res.status(404).json({
                message: `Not found Team with id ${req.params.teamID}.`
            });
            return;
        }
        let trophies = await team.getTeamTrophies();
        if (trophies.length == 0) {
            res.status(404).json({
                message: `Team with id ${req.params.teamID} has no trophies!`
            })
        }
        else {
            res.status(200).json(trophies);
        }
        

    }
    catch (err) {
        res.status(500).json({
            message: err.message || `Error retrieving Trophies for Team with id ${req.params.teamID}.`
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

    let team = Team.findByPk(req.params.teamID)
    console.log(team, "teste")
    if (team == null) {
        res.status(404).json({message: `Not found team with id ${req.params.teamID}!`})
        return;
    }

    console.log(req.body.description, req.body.points, req.params.teamID);
    // Save Comment in the database
    Trophie.create({
        description: req.body.description, points: req.body.points, teamId: req.params.teamID
    })
        .then(data => {
            res.status(201).json({
                message: "New trophie created.", location: "/teams/" +
                    req.params.teamID + "/trophies/" + data.id
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