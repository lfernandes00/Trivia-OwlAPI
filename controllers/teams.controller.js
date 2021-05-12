// get resource model (definition and DB operations)
const db = require("../models/db.js");
const Team = db.team;

const { Op } = require('sequelize');
const { teamMember, teamTrophie } = require("../models/db.js");

// get all teams
exports.findAll = (req, res) => {
    Team.findAll()
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
    Team.findByPk(req.params.teamID, {
        include: [
            {
                model: teamMember
            },
            {
                model: teamTrophie
            }
        ]
    })
        .then(data => {
            if (data === null)
                res.status(404).json({ message: `Team with id ${req.params.teamID} not found!` })
            else
                res.json(data)
        })
        .catch(err => {
            res.status(500).json({ message: err.message || "Some error occurred while retrieving the team!" })
        })
};

// Remove team
exports.remove = (req, res) => {
    Team.destroy({ where: { id: req.params.teamID } })
        .then(num => {
            if (num == 1) {
                res.status(200).json({ message: `Team with id ${req.params.teamID} deleted with success` })
            } else {
                res.status(404).json({ message: `Team with id ${req.params.teamID} not found!` })
            }
        })
        .catch(err => {
            res.status(500).json({ message: err.message || "Some error occurred while deleting the team!" })
        })
};

// create new team
exports.create = (req, res) => {
    if (!req.body) {
        res.status(400).json({ message: "Request body can not be empty!" });
        return;
    }
    else if (!req.body.name) {
        res.status(400).json({message: "Name can not be empty!"})
        return;
    }
    else if (!req.body.creater) {
        res.status(400).json({message: "Creater can not be empty!"})
        return;
    }
    else if (!req.body.photo) {
        res.status(400).json({message: "Photo can not be empty!"})
        return;
    }
    else if (!req.body.level) {
        res.status(400).json({message: "Level can not be empty!"})
        return;
    }
    else if (!req.body.points) {
        res.status(400).json({message: "Points can not be empty!"})
        return;
    }

    Team.create(req.body)
        .then(data => {
            res.status(201).json({ message: "New team created", location: "/teams" + data.id })
        })
        .catch(err => {
            if (err.name === 'SequelizeValidationError')
                res.status(404).json({ message: err.errors[0].message });
            else
                res.status(500).json({ message: err.message || "Some error occurred while creating the team!" })
        })
};

// Update team informations
exports.update = (req, res) => {
    if (!req.body) {
        res.status(400).json({ message: "Request body can not be empty!" });
        return;
    }
    else if (!req.body.name) {
        res.status(400).json({message: "Name can not be empty!"})
        return;
    }
    else if (!req.body.creater) {
        res.status(400).json({message: "Creater can not be empty!"})
        return;
    }
    else if (!req.body.photo) {
        res.status(400).json({message: "Photo can not be empty!"})
        return;
    }
    else if (!req.body.level) {
        res.status(400).json({message: "Level can not be empty!"})
        return;
    }
    else if (!req.body.points) {
        res.status(400).json({message: "Points can not be empty!"})
        return;
    }

    Team.update(req.body, { where: { id: req.params.teamID } })
        .then(num => {
            if (num == 1) {
                res.status(200).json({
                    message: `Team id=${req.params.teamID} was updated successfully.`
                });
            } else {
                res.status(200).json({
                    message: `No updates were made on Team id=${req.params.teamID}.`
                });
            }
        })
};