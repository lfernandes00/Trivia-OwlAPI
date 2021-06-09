// get resource model (definition and DB operations)
const db = require("../models/db.js");
const Activity = db.activity;
const User = db.user;
const Score = db.Score;

const { Op } = require('sequelize');

// get all activities
exports.findAll = (req, res) => {
    Activity.findAll({where: {pending: 1},
        include: [
            {
                model: User, as: 'Likes', attributes: ["id"]
            }
        ]
    })
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
// get all proposals
exports.findAllProposals = (req, res) => {
    Activity.findAll({where: {pending: 0}})
        .then(data => {
            if (data == 0) {
                res.status(404).json({message: `0 proposals found`})
            } else {
                res.status(200).json(data);
            }
            
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
                model: User, as: 'Likes', attributes: ["id"]
            },
            {
                model: User, as: 'Scores', attributes: ["id"]
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

exports.updateActivity = (req, res) => {

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

// add one like (user) to one activity 
exports.addLike = (req, res) => {
    Activity.findByPk(req.params.activityID)
        .then(activity => {
            // console.log(activity)
            if (activity === null)
               return res.status(404).json({
                    message: `Not found Activity with id ${req.params.activityID}.`
                });
            else {
                User.findByPk(req.body.userId)
                    .then(user => {
                        // console.log(user)
                        if (user === null)
                            return res.status(404).json({
                                message: `Not found User with id ${req.body.userId}.`
                            });
                        else {
                            user.addLike(activity)
                                .then(data => {
                                    // console.log(data);
                                    if (data === undefined)
                                        return res.status(200).json({
                                            message: `User ${req.body.userId} like was already assigned to Activity ${req.params.activityID}.`
                                        });
                                    else
                                       return  res.status(201).json({
                                            message: `Added User ${req.body.userId} like to Activity ${req.params.activityID}.`
                                        });
                                })
                        }
                    })
            }
        })
        .catch(err => {
            res.status(500).json({
                message: err.message || `Error adding User ${req.body.userId} to Activity ${req.params.activityID}.`
            });
        });
};

// remove one like (user) from one activity
exports.removeLike = async (req, res) => {
    try {
        let activity = await Activity.findByPk(req.params.activityID)

        // no data returned means there is no activity in DB with that given ID 
        if (activity === null) {
            res.status(404).json({
                message: `Not found Activity with id ${req.params.activityID}.`
            });
            return;
        }

        let user = await User.findByPk(req.body.userId)

        // no data returned means there is no user in DB with that given ID 
        if (user === null) {
            res.status(404).json({
                message: `Not found User with id ${req.body.userId}.`
            });
            return;
        }

        let data = await user.removeLike(activity)

        // console.log(data);
        if (data === 1)
            res.status(200).json({
                message: `Removed User ${req.body.userId} like to activity ${req.params.activityID}.`
            });
        else
            res.status(404).json({
                message: `No User ${req.body.userId} associated to activity ${req.params.activityID}.`
            });
    }
    catch (err) {
        res.status(500).json({
            message: err.message || `Error adding User ${req.body.userId} to Activity ${req.params.activityID}.`
        })
    };
};

// add one score (user) to one activity
exports.addScore = async (req, res) => {
    try {
        let activity = await Activity.findByPk(req.params.activityID);

        // no data returned means there is no activity in DB with that given ID 
        if (activity === null) {
            res.status(404).json({
                message: `Not found Tutorial with id ${req.params.activityID}.`
            });
            return;
        }
        console.log(activity)

        let user = await User.findByPk(req.body.userId);

        // no data returned means there is no user in DB with that given ID 
        if (user === null) {
            res.status(404).json({
                message: `Not found Tutorial with id ${req.body.userId}.`
            });
            return;
        }
        console.log(user)

        let newScore = {
            activityId: req.params.activityID,
            userId: req.body.userId,
            score: req.body.score
        }
        console.log("new score", newScore)

        let score = await Score.create(newScore);
        console.log("score:", score)

        res.status(201).json({ message: "New Score created.", location: "/activities/" + req.params.activityID + "/classification/"});

    }
    catch (err) {
        console.log(err)
        if (err.name === 'SequelizeValidationError')
            res.status(400).json({ message: err.errors[0].message });
        else
            res.status(500).json({
                message: err.message || "Some error occurred while creating the Score."
            });
    }
};

// get all activity scores
exports.findAllScores = async (req, res) => {
    try {
        let activity = await Activity.findByPk(req.params.activityID);

        // no data returned means there is no activity in DB with that given ID 
        if (activity === null) {
            res.status(404).json({
                message: `Not found Activity with id ${req.params.activityID}.`
            });
            return;
        }
        // WITHOUT activity info
        let scores = await activity.getScores();
        console.log(scores)

        if (scores.length === 0) {
            res.status(404).json({
                message: `Activity with id ${req.params.activityID} has no scores.`
            });
            return;
        } else {
            res.status(200).json(scores);
            return;
        }
        

    }
    catch (err) {
        res.status(500).json({
            message: err.message || `Error retrieving Scores for Activity with id ${req.params.activityID}.`
        });
    }
};