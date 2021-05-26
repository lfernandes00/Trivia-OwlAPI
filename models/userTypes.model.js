module.exports = (sequelize, DataTypes) => {
    const Type = sequelize.define("userType", {
        userId: {
            type: DataTypes.INTEGER,
            allowNull: false,
            validate: { notNull: { msg: "userId can not be empty!" } }
        },
        type: {
            type: DataTypes.STRING,
            allowNull:false,
            validate: {notNull: {msg: "type can not be empty!"}}
        }
    }, {
        timestamps: false
    });
    return Type;
};