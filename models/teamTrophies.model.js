// module.exports = (sequelize, DataTypes) => {
//     const Trophie = sequelize.define("teamTrophie", {
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
//         teamId: {
//             type: DataTypes.INTEGER,
//             allowNull: false,
//             validate: { notNull: { msg: "teamId can not be empty!" } }
//         }
//     }, {
//         timestamps: false
//     });
//     return Trophie;
// };