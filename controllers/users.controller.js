// get resource model (definition and DB operations)
const db = require("../models/db.js");
const User = db.user;
const Score = db.activityScore;
const Trophy = db.trophy;
const Type = db.userType;

const { Op } = require('sequelize');
const { user } = require("../models/db.js");
// const userTrophie = require("../models/db.js");


// get all users
exports.findAll = (req, res) => {
    User.findAll({
        include: [
            {
                model: Type, attributes: ["type"] // remove ALL data retrieved from join table
            }
        ]
    })
        .then(data => {
            res.status(200).json(data);
        })
        .catch(err => {
            res.status(500).json({
                message:
                    err.message || "Some error occurred while retrieving users."
            });
        });
};

// get team by id
exports.findOne = (req, res) => {
    User.findByPk(req.params.userID, {
        include: [
            {
                model: Type, attributes: ["type"] // remove ALL data retrieved from join table
            },
            {
                model: Trophy, attributes: ["desc"] // user trophies
            }
        ]
    })
        .then(data => {
            if (data === null)
                res.status(404).json({ message: `User with id ${req.params.userID} not found!` })
            else
                res.json(data)
        })
        .catch(err => {
            res.status(500).json({ message: err.message || "Some error occurred while retrieving the user!" })
        })
};

// Remove user
exports.remove = (req, res) => {
    User.destroy({ where: { id: req.params.userID } })
        .then(num => {
            if (num == 1) {
                Type.destroy({ where: { userId: req.params.userID } })
                res.status(200).json({ message: `User with id ${req.params.userID} deleted with success` })
            } else {
                res.status(404).json({ message: `User with id ${req.params.userID} not found!` })
            }
        })
        .catch(err => {
            res.status(500).json({ message: err.message || "Some error occurred while deleting the user!" })
        })
};

// create new user
// exports.create = (req, res) => {

//     const newUser = {
//         username: req.body.username,
//         password: req.body.password,
//         name: req.body.name,
//         birthDate: req.body.birthDate,
//         course: req.body.course,
//         level: req.body.level,
//         photo: req.body.photo,
//         doneActivities: req.body.doneActivities,
//         points: req.body.points,
//         teamId: req.body.teamId,
//         pending: req.body.pending
//     }

//     User.create(newUser)
//         .then(data => {
//             res.status(201).json({ message: "New user created", location: "/users" + data.id })
//         })
//         .catch(err => {
//             if (err.name === 'SequelizeValidationError')
//                 res.status(404).json({ message: err.errors[0].message });
//             else
//                 res.status(500).json({ message: err.message || "Some error occurred while creating the user!" })
//         })
// };

exports.create = async (req, res) => {
    try {

        const users = await User.findAll();

        for (let i= 0;i<users.length;i++) {
            if (users[i].dataValues.username == req.body.username) {
                res.status(404).json({
                    message: `Username already exists!`
                })
                return;
            }
        }

        
        let newUser = {
            username: req.body.username,
            password: req.body.password,
            name: req.body.name,
            birthDate: req.body.birthDate,
            course: req.body.course,
            level: req.body.level,
            photo: req.body.photo,
            doneActivities: req.body.doneActivities,
            points: req.body.points
        }
        console.log(newUser)

        await User.create(newUser)

        const users1 = await User.findAll()

        const newUser2 = users1[users1.length -1]
        console.log(newUser2)
        let newType = {
            type: req.body.type
        }

        let type = await Type.create(newType)
        await newUser2.addUserType(type)

        res.status(201).json({ message: "New Like created.", location: "/activities/" + req.params.activityID  })
        
    }
    catch (err) {
        if (err.name === 'SequelizeValidationError')
            res.status(400).json({ message: err.errors[0].message });
        else
            res.status(500).json({
                message: err.message || "Some error occurred while creating the new user."
            });
    }
};

// Update user informations
exports.update = (req, res) => {

    User.update(req.body, { where: { id: req.params.userID } })
        .then(num => {
            if (num == 1) {
                res.status(200).json({
                    message: `User id=${req.params.userID} was updated successfully.`
                });
            } else {
                res.status(200).json({
                    message: `No updates were made on User id=${req.params.userID}.`
                });
            }
        })
};