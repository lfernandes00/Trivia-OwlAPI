module.exports = (sequelize, DataTypes) => {
    const Score = sequelize.define("activityScore", {
        activityId: {
            type: DataTypes.INTEGER,
            allowNull: false,
            validate: { notNull: { msg: "activityId can not be empty!" } }
        },
        userId: {
            type: DataTypes.INTEGER,
            allowNull: false,
            validate: { notNull: { msg: "userId can not be empty!" } }
        },
        score: {
            type: DataTypes.INTEGER,
            allowNull: false,
            validate: { notNull: { msg: "score can not be empty!" } }
        },
    }, {
        timestamps: false
    });
    return Score;
};