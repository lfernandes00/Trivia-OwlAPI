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

//asdfjkldfjk