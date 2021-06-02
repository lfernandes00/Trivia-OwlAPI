module.exports = (sequelize, DataTypes) => {
    const Type = sequelize.define("userType", {
        name: {
            type: DataTypes.STRING,
            allowNull:false,
            validate: {notNull: {msg: "name can not be empty!"}}
        }
    }, {
        timestamps: false
    });
    return Type;
};