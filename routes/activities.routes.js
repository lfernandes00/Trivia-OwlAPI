const express = require('express');
let router = express.Router();
const activityController = require('../controllers/activities.controller');
const authController = require('../controllers/auth.controller')
const userController = require('../controllers/users.controller');
const trophieController = require('../controllers/trophies.controller');
// middleware for all routes related with teams
router.use((req, res, next) => {
    const start = Date.now();
    res.on("finish", () => { //finish event is emitted once the response is sent to the client
        const diffSeconds = (Date.now() - start) / 1000; //figure out how many seconds elapsed
        console.log(`${req.method} ${req.originalUrl} completed in ${diffSeconds} seconds`);
    });
    next()
})

router.get('/', activityController.findAll);

router.get('/admin', authController.verifyToken, authController.isAdmin, activityController.findAll);

router.get('/:activityID', activityController.findOne);

router.delete('/admin', activityController.remove);

router.post('/add', activityController.create);

router.post('/:activityID', activityController.addLike);

router.delete('/:activityID', activityController.removeLike);

router.patch('/admin', activityController.update);

router.get('/:activityID/classification', activityController.findAllScores);

router.post('/:activityID/questions', activityController.addScore);

router.patch('/:activityID/questions', userController.updateUser);

//send a predefined error message for invalid routes on TEAMS
router.all('*', function (req, res) {
    res.status(404).json({ message: 'ACTIVITIES: what???' });
})
// EXPORT ROUTES (required by APP)
module.exports = router;