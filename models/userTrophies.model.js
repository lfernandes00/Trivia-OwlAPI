// module.exports = (sequelize, DataTypes) => {
//     const Trophie = sequelize.define("userTrophie", {
//         description: {
//             type: DataTypes.STRING,
//             allowNull: false,
//             validate: { notNull: { msg: "Description can not be empty!" } }
//         },
//         points: {
//             type: DataTypes.INTEGER,
//             allowNull: false,
//             validate: { notNull: { msg: "Points can not be empty!" } }
//         },
//         userId: {
//             type: DataTypes.INTEGER,
//             allowNull: false,
//             validate: { notNull: { msg: "userId can not be empty!" } }
//         }
//     }, {
//         timestamps: false
//     });
//     return Trophie;
// };