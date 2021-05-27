module.exports = (sequelize, DataTypes) => {
    const Like = sequelize.define("activityLike", {
        activityId: {
            type: DataTypes.INTEGER,
            allowNull: false,
            validate: { notNull: { msg: "activityId can not be empty!" } }
        },
        userId: {
            type: DataTypes.INTEGER,
            allowNull: false,
            validate: {notNull: {msg: "trophyId can not be empty!"}}
        }
    }, {
        timestamps: false
    });
    return Like;
};