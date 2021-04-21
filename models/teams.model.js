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

Team.findById = (id, result) => {
    sql.query("SELECT * FROM teams WHERE id = ?", [id], (err, res) => {
        if (err) {
            result(err, null);
            return;
        }

        if (res.length) {
            result(null, res[0]);
            return;
        }

        result(null, res); // the result will be sent to the CONTROLLER
    });
};

Team.remove = (id, result) => {
    sql.query("DELETE FROM teams WHERE id = ?", [id], (err, res) => {
        if (err) {
            result(err, null);
            return;
        }

        if (res.affectedRows==1) {
            result(null, res);
            return;
        }

        result(null, res); // the result will be sent to the CONTROLLER
    });
};

Team.create = (newTeam, result) => {
    sql.query("INSERT INTO teams SET ?", newTeam, (err, res) => {
        if (err) {
            result(err, null);
            return;
        }

        result(null, {message: `Team with id ${newTeam.id} created!`});
    });
};

Team.updateById = (idTeam, team, result) => {

    // OR let query = 'UPDATE tutorials SET title = ?, description = ?, published = ? WHERE id = ?';
    let query = 'UPDATE teams SET ? WHERE ?';

    let q = sql.query(
        query,
        // OR [tutorial.title, tutorial.description, tutorial.published, id]
        [team, {id: idTeam}], // objects are turned into key = 'val' pairs for each enumerable property
        (err, res) => {
            
            //console.log(q.sql); // to check the query string

            if (err) {
                result(err, null);
                return;
            }
            // res.affectedRows: number of selected rows to update
            // res.changedRows: number of effectively updated rows
            
            // not found Tutorials with the specified ID: setup a new error property 'kind'
            if (res.affectedRows == 0) {
                result({ kind: "not_found" }, null);
                return;
            }

            result(null, res);
        });
};
// EXPORT MODEL (required by CONTROLLER)
module.exports = Team;