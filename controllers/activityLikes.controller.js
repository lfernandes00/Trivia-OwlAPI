const db = require("../models/db.js");
const Activity = db.activity;
const Like = db.activityLike;

const { Op } = require('sequelize');

// add new Like
exports.create = async (req, res) => {
    try {
        let activity = await Activity.findByPk(req.params.activityID);

        if (activity == null) {
            res.status(404).json({
                message: `Not found Activity with id ${req.params.activityID}`
            });
            return;
        }

        const likes = await Like.findAll({where: {activityId: req.params.activityID}});

        for (let i= 0;i<likes.length;i++) {
            if (likes[i].dataValues.userId == req.body.userId) {
                res.status(404).json({
                    message: `User already liked this activity!`
                })
                return;
            }
        }

        
        let newLike = {
            activityId: req.params.activityID,
            userId: req.body.userId
        }
        console.log(newLike)

        let like = await Like.create(newLike)
        await activity.addActivityLike(like)

        res.status(201).json({ message: "New Like created.", location: "/activities/" + req.params.activityID  })
        
    }
    catch (err) {
        if (err.name === 'SequelizeValidationError')
            res.status(400).json({ message: err.errors[0].message });
        else
            res.status(500).json({
                message: err.message || "Some error occurred while creating the like."
            });
    }
};

// remove like
// exports.delete = (req, res) => {
//     Like.destroy({ where: { activityId: req.params.activityID , userId: } })
//         .then(num => {
//             // check if one comment was deleted
//             if (num == 1) {
//                 res.status(200).json({
//                     message: `Comment with id ${req.params.commentID} was successfully deleted!`
//                 });
//             } else {
//                 res.status(404).json({
//                     message: `Not found Comment with id=${req.params.commentID}.`
//                 });
//             }
//         })
//         .catch(err => {
//             res.status(500).json({
//                 message: err.message || `Error deleting Comment with id=${req.params.commentID}.`
//             });
//         });
// };