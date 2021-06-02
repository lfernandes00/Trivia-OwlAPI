const express = require('express');
let router = express.Router();
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

router.get('/', userController.findAll);

router.get('/:userID', userController.findOne);

router.delete('/:userID', userController.remove);
// router.delete('/:userID', typeController.remove);

router.put('/:userID', userController.update);

router.get('/:userID/trophies', trophyController.findAll);

router.post('/:userID/trophies', trophyController.create);

//send a predefined error message for invalid routes on USERS
router.all('*', function (req, res) {
    res.status(404).json({ message: 'USERS: what???' });
})
// EXPORT ROUTES (required by APP)
module.exports = router;