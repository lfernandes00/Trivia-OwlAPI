const db = require("../models/db.js");
const User = db.user;
const Type = db.userType;

const { Op } = require('sequelize');

// get user type
exports.findAll = async (req, res) => {
    try {
        let user = await User.findByPk(req.params.userID);
        if (user === null) {
            res.status(404).json({
                message: `Not found User with id ${req.params.userID}.`
            });
            return;
        }
        let type = await user.getUserTypes();
        res.status(200).json(type);
        

    }
    catch (err) {
        res.status(500).json({
            message: err.message || `Error retrieving Type for User with id ${req.params.userID}.`
        });
    }
};

// add new user type
exports.create = (req, res) => {

    const newType = {
        type: req.body.type
    }
    
    Type.create(newType)
        .then(data => {
            res.status(201).json({ message: "New userType created", location: "/users" + data.id })
        })
        .catch(err => {
            if (err.name === 'SequelizeValidationError')
                res.status(404).json({ message: err.errors[0].message });
            else
                res.status(500).json({ message: err.message || "Some error occurred while creating the userType!" })
        })
};

// Remove user type
exports.remove = (req, res) => {
    Type.destroy({ where: { id: req.params.userID } })
        .then(num => {
            if (num == 1) {
                res.status(200).json({ message: `UserType with id ${req.params.userID} deleted with success` })
            } else {
                res.status(404).json({ message: `UserType with id ${req.params.userID} not found!` })
            }
        })
        .catch(err => {
            res.status(500).json({ message: err.message || "Some error occurred while deleting the userType!" })
        })
};
