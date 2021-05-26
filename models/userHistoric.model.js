// module.exports = (sequelize, DataTypes) => {
//     const Historic = sequelize.define("userHistoric", {
//         id: {
//             type: DataTypes.STRING,
//             allowNull: false,
//             validate: { notNull: { msg: "Id can not be empty!" } }
//         },
//         name: {
//             type: DataTypes.INTEGER,
//             allowNull: false,
//             validate: { notNull: { msg: "Name can not be empty!" } }
//         },
//         course: {
//             type: DataTypes.INTEGER,
//             allowNull: false,
//             validate: { notNull: { msg: "Course can not be empty!" } }
//         },
//         points: {
//             type: DataTypes.INTEGER,
//             allowNull: false,
//             validate: { notNull: { msg: "Points can not be empty!" } }
//         },
//         userId: {
//             type: DataTypes.INTEGER,
//             allowNull: false,
//             validate: { notNull: { msg: "userid can not be empty!" } }
//         }
//     }, {
//         timestamps: false
//     });
//     return Historic;
// };