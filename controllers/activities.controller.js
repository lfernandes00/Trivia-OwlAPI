// get resource model (definition and DB operations)
const db = require("../models/db.js");
const Activity = db.activity;
const User = db.user;

const { Op } = require('sequelize');

// get all activities
exports.findAll = (req, res) => {
    Activity.findAll()
        .then(data => {
            res.status(200).json(data);
        })
        .catch(err => {
            res.status(500).json({
                message:
                    err.message || "Some error occurred while retrieving activities."
            });
        });
};

// get activity by id
exports.findOne = (req, res) => {
    Activity.findByPk(req.params.activityID, {
        include: [
            {
                model: User, through: { attributes: ['userId'] }
            }
        ]
    })
        .then(data => {
            if (data === null)
                res.status(404).json({ message: `Activity with id ${req.params.activityID} not found!` })
            else
                res.json(data)
        })
        .catch(err => {
            res.status(500).json({ message: err.message || "Some error occurred while retrieving the activity!" })
        })
};

// Remove activity
exports.remove = (req, res) => {
    Activity.destroy({ where: { id: req.params.activityID } })
        .then(num => {
            if (num == 1) {
                res.status(200).json({ message: `Activity with id ${req.params.activityID} deleted with success` })
            } else {
                res.status(404).json({ message: `Activity with id ${req.params.activityID} not found!` })
            }
        })
        .catch(err => {
            res.status(500).json({ message: err.message || "Some error occurred while deleting the activity !" })
        })
};

// create new activity
exports.create = (req, res) => {

    const newActivity = {
        name: req.body.name,
        course: req.body.course,
        subject: req.body.subject,
        points: req.body.points,
        type: req.body.type,
        desc: req.body.desc,
        photo: req.body.photo,
        question1: req.body.question1,
        question2: req.body.question2,
        question3: req.body.question3,
        question4: req.body.question4,
        question5: req.body.question5,
        pending: req.body.pending
    }

    Activity.create(newActivity)
        .then(data => {
            res.status(201).json({ message: "New activity created", location: "/activities" + data.id })
        })
        .catch(err => {
            if (err.name === 'SequelizeValidationError')
                res.status(404).json({ message: err.errors[0].message });
            else
                res.status(500).json({ message: err.message || "Some error occurred while creating the activity!" })
        })
};

// Update activity pending
exports.update = (req, res) => {

    if (req.body.pending != 1) {
        res.status(404).json({message: "Pending value must be 0 or 1!"})
        return;
    }

    Activity.update(req.body, { where: { id: req.params.activityID } })
        .then(num => {
            if (num == 1) {
                res.status(200).json({
                    message: `Activity id=${req.params.activityID} was updated successfully.`
                });
            } else {
                res.status(404).json({
                    message: `Activity with id=${req.params.activityID} not found!`
                })
            }
        })
        .catch(err => {
            res.status(500).json({
                message: err.message || "Some error occurred while updating the activity!"
            })
        })
};

// add new like
exports.create = (req, res) => {

    const newLike = {
        activityId: req.params.activityID,
        userId: req.body.userId
    }

    Like.create(newLike)
        .then(data => {
            res.status(201).json({ message: "New activity created", location: "/activities" + data.id })
        })
        .catch(err => {
            if (err.name === 'SequelizeValidationError')
                res.status(404).json({ message: err.errors[0].message });
            else
                res.status(500).json({ message: err.message || "Some error occurred while creating the activity!" })
        })
};