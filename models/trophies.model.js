module.exports = (sequelize, DataTypes) => {
    const Trophy = sequelize.define("trophie", {
        desc: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: { notNull: { msg: "desc can not be empty!" } } 
        },
        points: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: { notNull: { msg: "Password can not be empty!" } } 
        },
    }, {
        timestamps: false
    });
    return Trophy;
};