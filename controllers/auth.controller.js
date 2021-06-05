const jwt= require("jsonwebtoken");
const bcrypt= require("bcryptjs");

const config = require("../config/auth.config.js");
const db = require("../models/db.js");
const User = db.user; 
const Type = db.userType;

exports.signup = async (req, res) => {
    try {// check duplicate username 
        let user = await User.findOne(
            { where: { username: req.body.username} }
        );

        if (user)
            return res.status(400).json({ message: "Failed! Username is already in use!" });
            
        // save User to database
        user = await User.create({
            username: req.body.username,
            password: bcrypt.hashSync(req.body.password, 8), // generates hash to password
            name: req.body.name,
            birthDate: req.body.birthDate,
            course: req.body.course,
            level: req.body.level,
            photo: req.body.photo,
            doneActivities: req.body.doneActivities,
            points: req.body.points,
            typeId: req.body.typeId
        });
        

        if (req.body.typeId) {
            let type = await Type.findOne({ where: { name: req.body.typeId} });
            console.log(type, "asdasf")
            if (type)await user.setUserType(type);
        } else
            await user.setUserType(2);
        return res.status(201).json({ message: "User was registered successfully!" });
        
    }
    catch (err) {
        console.log(err.message)
        res.status(500).json({ message: err.message});
    };
};

exports.signin= async (req, res) => {
    try {
        let user = await User.findOne({ where: { username: req.body.username} });
        
        if (!user) 
            return res.status(404).json({ message: "User Not found." });
        // tests a string (password in body) against a hash (password in database)
        console.log("comparação",req.body.password, user.password)
        const passwordIsValid = bcrypt.compareSync( 
            req.body.password, user.password
        );
        console.log("asd", passwordIsValid)
        
        if (!passwordIsValid) {
            return res.status(401).json({
                accessToken: null, message: "Invalid Password!"
            });
        }
        // sign the given payload (user ID) into a JWT payload –builds JWT token,using secret key
        const token = jwt.sign({ id: user.id }, config.secret, { expiresIn: 86400 // 1 hour
        });
        console.log(token)
        
        let type = await user.getUserType();
        return res.status(200).json({
            id: user.id, 
            username: user.username,
            password: user.password,
            name: user.name,
            birthDate: user.birthDate,
            course: user.course,
            level: user.level,
            photo: user.photo,
            doneActivities: user.doneActivities,
            points: user.points,
            type: type.name,
            accessToken: token
        });
    } 
    catch (err) { res.status(500).json({ message: err.message}); console.log(err);};
};

exports.verifyToken= (req, res, next) => {
    let token = req.headers["x-access-token"];

    if (!token) {
        return res.status(403).send({
            message: "No token provided!"
        });
    }// verify request token given the JWT secret key
    
    jwt.verify(token, config.secret, (err, decoded) => {
        if (err) {
            return res.status(401).send({ message: "Unauthorized!" });
        }
        req.loggedUserId= decoded.id; // save user ID for future verifications
        console.log(req.loggedUserId)
        next();
    });
};

exports.isAdmin= async (req, res, next) => {
    let user = await User.findByPk(req.loggedUserId);
    let type = await user.getUserType();

    console.log(type.name)
    
    if (type.name === "admin") {
        next();
    } else {
        return res.status(403).send({ message: "Require Admin Role!" });
    }
    
    
};

exports.isStudent= async (req, res, next) => {
    let user = await User.findByPk(req.loggedUserId);
    let type = await user.getUserType();

    console.log(type.name)
    
    if (type.name === "estudante") {
        next();
    } else {
        return res.status(403).send({ message: "Require Student Role!" });
    }
    
    
};

exports.isTeacherOrAdmin= async (req, res, next) => {
    let user = await User.findByPk(req.loggedUserId);
    let type = await user.getUserType();
    
    if (type.name === "admin" || type.name === 'docente') {
        next();
    } else {
        return res.status(403).send({ message: "Require Admin or Teacher Role!" });
    }
};

exports.isAdminOrLoggedUser= async (req, res, next) => {
    let user = await User.findByPk(req.loggedUserId);
    let type = await user.getUserType();

    if (type.name === "admin" || user.id == req.params.userID) 
        next();
        
    return res.status(403).send({ message: "Require Admin Role!" });
};
