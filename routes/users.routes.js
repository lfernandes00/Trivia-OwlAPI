const express = require('express');
let router = express.Router();
const userController = require('../controllers/users.controller');
const trophyController = require('../controllers/trophies.controller');
const authController = require('../controllers/auth.controller');
// middleware for all routes related with teams
router.use((req, res, next) => {
    const start = Date.now();
    res.on("finish", () => { //finish event is emitted once the response is sent to the client
        const diffSeconds = (Date.now() - start) / 1000; //figure out how many seconds elapsed
        console.log(`${req.method} ${req.originalUrl} completed in ${diffSeconds} seconds`);
    });
    next()
})

router.get('/admin',authController.verifyToken, authController.isAdmin, userController.findAll); // correto

router.get('/students', userController.findAllStudents); // correto

router.get('/:userID',authController.verifyToken, userController.findOne); // correto

router.delete('/:userID',authController.verifyToken, authController.isAdmin, userController.remove); // correto

router.patch('/:userID',authController.verifyToken, userController.update); // correto

router.get('/:userID/trophies',authController.verifyToken, trophyController.findAll); // correto

 // correto mas precisa de mudar de rota

//send a predefined error message for invalid routes on USERS
router.all('*', function (req, res) {
    res.status(404).json({ message: 'USERS: what???' });
})
// EXPORT ROUTES (required by APP)
module.exports = router;