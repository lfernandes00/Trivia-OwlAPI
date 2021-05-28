const db = require("../models/db.js");
const Activity = db.activity;
const Score = db.activityScore;

const { Op } = require('sequelize');

// get all activity scores
exports.findAll = async (req, res) => {
    try {
        let activity = await Activity.findByPk(req.params.activityID);
        if (activity === null) {
            res.status(404).json({
                message: `Not found Activity with id ${req.params.activityID}.`
            });
            return;
        }
        // console.log(activity)


        let scores = await activity.getActivityScores();
        console.log(scores);
        if (scores.length == 0) {
            res.status(404).json({
                message: `Activity with id ${req.params.activityID} has no scores!`
            })
        }
        else {
            res.status(200).json(scores);
        }


    }
    catch (err) {
        res.status(500).json({
            message: err.message || `Error retrieving Scores for Activity with id ${req.params.activityID}.`
        });
    }
};

//add new score
exports.create = async (req, res) => {
    try {
        let activity = await Activity.findByPk(req.params.activityID);

        if (activity == null) {
            res.status(404).json({
                message: `Not found Activity with id ${req.params.activityID}`
            });
            return;
        }

        const scores = await Score.findAll({where: {activityId: req.params.activityID}});

        for (let i= 0;i<scores.length;i++) {
            if (scores[i].dataValues.userId == req.body.userId) {
                res.status(404).json({
                    message: `User already has a score in this activity!`
                })
                return;
            }
        }

        
        let newScore = {
            activityId: req.params.activityID,
            userId: req.body.userId,
            score: req.body.score
        }
        console.log(newScore)

        let score = await Score.create(newScore)
        await activity.addActivityScore(score)

        res.status(201).json({ message: "New score created.", location: "/activities/" + req.params.activityID + "/scores/" + score.id })
        
    }
    catch (err) {
        if (err.name === 'SequelizeValidationError')
            res.status(400).json({ message: err.errors[0].message });
        else
            res.status(500).json({
                message: err.message || "Some error occurred while creating the score."
            });
    }
};

// update user points and activities done