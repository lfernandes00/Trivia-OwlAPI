const express = require('express');
let router = express.Router();
const activityController = require('../controllers/activities.controller');
const authController = require('../controllers/auth.controller')
const userController = require('../controllers/users.controller');
const trophyController = require('../controllers/trophies.controller');
// middleware for all routes related with teams
router.use((req, res, next) => {
    const start = Date.now();
    res.on("finish", () => { //finish event is emitted once the response is sent to the client
        const diffSeconds = (Date.now() - start) / 1000; //figure out how many seconds elapsed
        console.log(`${req.method} ${req.originalUrl} completed in ${diffSeconds} seconds`);
    });
    next()
})

router.get('/', activityController.findAll); // correto

router.get('/admin', authController.verifyToken, authController.isTeacherOrAdmin, activityController.findAllProposals); // correto

router.get('/:activityID',authController.verifyToken, activityController.findOne); // correto

router.delete('/:activityID/admin',authController.verifyToken, authController.isTeacherOrAdmin, activityController.remove); // corretoasd

router.post('/add',authController.verifyToken, activityController.create); // correto

router.post('/:activityID',authController.verifyToken, authController.isStudent, activityController.addLike); // correto

router.delete('/:activityID',authController.verifyToken,authController.isStudent, activityController.removeLike); // correto

router.patch('/:activityID',authController.verifyToken, authController.isTeacherOrAdmin, activityController.update); // correto

router.patch('/:activityID/admin',authController.verifyToken, authController.isTeacherOrAdmin, activityController.updateActivity); // correto

router.get('/:activityID/classification',authController.verifyToken, activityController.findAllScores); // correto

router.post('/:activityID/questions',authController.verifyToken, activityController.addScore); // correto

router.patch('/:activityID/questions',authController.verifyToken, userController.updateUser); // correto


//send a predefined error message for invalid routes on ACTIVITIES
router.all('*', function (req, res) {
    res.status(404).json({ message: 'ACTIVITIES: what???' });
})
// EXPORT ROUTES (required by APP)
module.exports = router;