module.exports = (sequelize, DataTypes) => {
    const Score = sequelize.define("activityScore", {
        activityId: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            allowNull: false,
            validate: { notNull: { msg: "activityId can not be empty!" } }
        },
        userId: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            allowNull: false,
            validate: { notNull: { msg: "userId can not be empty!" } }
        },
        score: {
            type: DataTypes.INTEGER,
        },
    }, {
        timestamps: false
    });
    return Score;
};