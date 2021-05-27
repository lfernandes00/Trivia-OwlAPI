module.exports = (sequelize, DataTypes) => {
    const Activity = sequelize.define("activities", {
        name: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: { notNull: { msg: "Username can not be empty!" } } 
        },
        course: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: { notNull: { msg: "Password can not be empty!" } } 
        },
        subject: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: { notNull: { msg: "Name can not be empty!" } } 
        },
        points: {
            type: DataTypes.INTEGER,
            allowNull: false,
            validate: { notNull: { msg: "Birth Date can not be empty!" } } 
        },
        type: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: { notNull: { msg: "Course can not be empty!" } } 
        },
        desc: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: { notNull: { msg: "Level can not be empty!" } } 
        },
        photo: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: { notNull: { msg: "Photo can not be empty!" } } 
        },
        question1: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: { notNull: { msg: "doneActivities can not be empty!" } } 
        },
        question2: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: { notNull: { msg: "Points can not be empty!" } } 
        },
        question3: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: { notNull: { msg: "teamId can not be empty!" } } 
        },
        question4: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: { notNull: { msg: "Pending can not be empty!" } } 
        },
        question5: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: { notNull: { msg: "Pending can not be empty!" } } 
        },
        pending: {
            type: DataTypes.INTEGER,
        },
    }, {
        timestamps: false
    });
    return Activity;
};