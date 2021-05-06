  const dbConfig = require('../config/db.config.js');
const { Sequelize, DataTypes } = require('sequelize');

const sequelize = new Sequelize(dbConfig.DB, dbConfig.USER, dbConfig.PASSWORD, {
    host: dbConfig.HOST,
    dialect: dbConfig.dialect
    ,
    pool: {
        max: dbConfig.pool.max,
        min: dbConfig.pool.min,
        acquire: dbConfig.pool.acquire,
        idle: dbConfig.pool.idle
    }
});

sequelize.authenticate()
    .then(() => {
        console.log('Connection has been established successfully.');
    })
    .catch(err => {
        console.error('Unable to connect to the database:', err);
    });

const db = {};
db.sequelize = sequelize;

//export TEAM model
db.team = require("./teams.model.js")(sequelize, DataTypes);
db.teamMember = require("./teamMembers.model.js")(sequelize, DataTypes);
db.teamTrophie = require("./teamTrophies.model.js")(sequelize, DataTypes);

db.user = require("./users.model.js")(sequelize, DataTypes);

db.team.hasMany(db.teamMember);
db.teamMember.belongsTo(db.team);

db.team.hasMany(db.teamTrophie);
db.teamTrophie.belongsTo(db.team);

module.exports = db;