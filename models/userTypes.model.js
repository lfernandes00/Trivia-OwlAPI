module.exports = (sequelize, DataTypes) => {
    const Type = sequelize.define("userType", {
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