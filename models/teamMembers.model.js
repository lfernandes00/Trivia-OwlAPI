// module.exports = (sequelize, DataTypes) => {
//     const Member = sequelize.define("teamMember", {
//         username: {
//             type: DataTypes.STRING,
//             allowNull: false,
//             validate: { notNull: { msg: "Username can not be empty!" } }
//         },
//         name: {
//             type: DataTypes.STRING,
//             allowNull: false,
//             validate: { notNull: { msg: "Email can not be empty!" } }
//         },
//         course: {
//             type: DataTypes.STRING,
//             allowNull: false,
//             validate: { notNull: { msg: "Course can not be empty!" } }
//         },
//         teamId: {
//             type: DataTypes.INTEGER,
//             allowNull: false,
//             validate: { notNull: { msg: "teamId can not be empty!" } }
//         }
//     }, {
//         timestamps: false
//     });
//     return Member;
// };