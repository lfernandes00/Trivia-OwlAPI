const sql = require("./db.js"); // get DB connection
// define TUTORIAL model constructor
const Team = function (team) {
    this.name = team.name;
    this.creater = team.creater;
    this.photo = team.photo;
    this.level = team.level;
    this.points = team.points;
};
// define method getAll to handle getting all Tutorials from DB
// result = "(error, data)", meaning it will return either an error message or some sort of data
Team.getAll = (result) => {
    sql.query("SELECT * FROM teams", (err, res) => {
        if (err) {
            result(err, null);
            return;
        }
        result(null, res); // the result will be sent to the CONTROLLER
    });
};
// EXPORT MODEL (required by CONTROLLER)
module.exports = Team;