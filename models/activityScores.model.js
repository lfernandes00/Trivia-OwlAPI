module.exports = (sequelize, DataTypes) => {
    const Score = sequelize.define("activityScore", {
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