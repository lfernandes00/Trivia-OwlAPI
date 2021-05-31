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


db.user = require("./users.model.js")(sequelize, DataTypes);
db.userType = require("./userTypes.model.js")(sequelize, DataTypes);
db.userTrophy = require("./userTrophies.model.js")(sequelize, DataTypes);
db.activity = require("./activities.model.js")(sequelize, DataTypes);
db.activityLike = require("./activityLikes.model.js")(sequelize, DataTypes);
db.activityScore = require("./activityScores.model.js")(sequelize, DataTypes);
db.trophy = require("./trophies.model.js")(sequelize, DataTypes);

db.user.hasOne(db.userType, {foreignKey: 'id'});
db.userType.belongsTo(db.user, {foreignKey: 'userId'});

db.user.belongsToMany(db.trophy, { through: 'userTrophies' });
db.trophy.belongsToMany(db.user, { through: 'userTrophies' });

db.user.belongsToMany(db.activity, { through: 'activityLikes' })
db.activity.belongsToMany(db.user, { through: 'activityLikes' })

db.activity.belongsToMany(db.user, { through: 'activityScores' })
db.user.belongsToMany(db.activity, { through: 'activityScores' })




module.exports = db;