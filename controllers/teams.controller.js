// get resource model (definition and DB operations)
const Team = require('../models/teams.model.js');
// EXPORT function to display list of all teams (required by ROUTER)
exports.findAll = (req, res) => {
    Team.getAll((err, data) => {
        if (err) // send error response
            res.status(500).send({
                message: err.message || "Some error occurred while retrieving tutorials."
            });
        else
            res.status(200).json(data); // send OK response with all tutorials data
    });
};

exports.findOne = (req, res) => {
    Team.findById(req.params.teamID, (err, data) => {
        if (err) // send error response
            if (err === 'not_found')
                res.status(404).json({message: `Cannot found team with id ${req.params.teamID}`});
            else 
            res.status(500).json({
                message: `Error retrieving Tutorial with id ${req.params.teamID}.`
            });
        else
            res.status(200).json(data); // send OK response with all tutorials data
    });
};

exports.remove = (req, res) => {
    Team.remove(req.params.teamID, (err, data) => {
        if (err) // send error response
            if (err === 'not_found')
                res.status(404).json({message: `Cannot found team with id ${req.params.teamID}`});
            else 
            res.status(500).json({
                message: `Error retrieving Tutorial with id ${req.params.teamID}.`
            });
        else
            res.status(200).json({message: `Team with id ${req.params.teamID} removed`}); // send OK response with all tutorials data
    });
};

exports.create = (req, res) => {

    if (!req.body || !req.body.name) {
        res.status(400).json({message: 'Name cannot be empty!'})
    }

    const team = {
        id: req.body.id,
        name: req.body.name,
        creater: req.body.creater,
        photo: req.body.photo,
        level: req.body.level,
        points: req.body.points
    }

    Team.create(team, (err, data) => {
        if (err) // send error response
            res.status(500).json({
                message: 'Some error happened while creating the new team'
            });
        else
            res.status(200).json(data); // send OK response with all tutorials data
    });
};

exports.update = (req, res) => {
    // Validate request
    if (!req.body || !req.body.name) {
        res.status(400).json({ message: "Request must have specify the new name!" });
        return;
    }

    const team = {
        name: req.body.name,
        creater: req.body.creater,
        photo: req.body.photo,
        level: req.body.level,
        points: req.body.points
    }

    // Update Tutorial in the database
    Team.updateById(req.params.teamID, team, (err, data) => {
        if (err) {
            if (err.kind === "not_found") {
                res.status(404).json({
                    message: `Not found Team with id ${req.params.teamID}.`
                });
            } else {
                res.status(500).json({
                    message: "Error updating Team with id " + req.params.teamID
                });
            }
        } else res.status(200).json({ message: "Updated team.", location: `/teams/${req.params.teamID}` });
    });
};