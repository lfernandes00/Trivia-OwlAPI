// module.exports = (sequelize, DataTypes) => {
//     const Team = sequelize.define("team", {
//         name: {
//             type: DataTypes.STRING,
//             allowNull: false,
//             validate: { notNull: { msg: "Name can not be empty!" } } 
//         },
//         creater: {
//             type: DataTypes.STRING
//         },
//         photo: {
//             type: DataTypes.STRING
//         },
//         level: {
//             type: DataTypes.INTEGER
//         },
//         points: {
//             type: DataTypes.INTEGER
//         }
//     }, {
//         timestamps: false
//     });
//     return Team;
// };