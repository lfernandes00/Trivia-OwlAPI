// get resource model (definition and DB operations)
const db = require("../models/db.js");
const Team = db.team;

const { Op } = require('sequelize');

const getPagination = (page, size) => {
    const limit = size ? size : 3; // limit = size (default is 3)
    const offset = page ? page * limit : 0; // offset = page * size (start counting from page 0)

    return { limit, offset };
};

const getPagingData = (data, page, limit) => {
    // data Sequelize Model method findAndCountAll function has the form
    // {
    //     count: 5,
    //     rows: [
    //              tutorial {...}
    //         ]
    // }
    const totalItems = data.count;
    const tutorials = data.rows;
    const currentPage = page;
    const totalPages = Math.ceil(totalItems / limit);

    return { totalItems, tutorials, totalPages, currentPage };
};

exports.findAll = (req, res) => {
    //get data from request query string
    let { page, size, name } = req.query;
    const condition = name ? { name: { [Op.like]: `%${name}%` } } : null;

    // validate page
    if (page && !req.query.page.match(/^(0|[1-9]\d*)$/g)) {
        res.status(400).json({ message: 'Page number must be 0 or a positive integer' });
        return;
    }
    else
        page = parseInt(page); // if OK, convert it into an integer
    // validate size
    if (size && !req.query.size.match(/^([1-9]\d*)$/g)) {
        res.status(400).json({ message: 'Size must be a positive integer' });
        return;
    } else
        size = parseInt(size); // if OK, convert it into an integer

    // convert page & size into limit & offset options for findAndCountAll
    const { limit, offset } = getPagination(page, size);

    Team.findAndCountAll({ where: condition, limit, offset })
        .then(data => {
            // convert response data into custom format
            const response = getPagingData(data, offset, limit);
            res.status(200).json(response);
        })
        .catch(err => {
            res.status(500).json({
                message:
                    err.message || "Some error occurred while retrieving teams."
            });
        });
};

exports.findOne = (req, res) => {
    Team.findByPk(req.params.teamID)
        .then(data => {
            if (data === null)
                res.status(404).json({ message: `Team with id ${req.params.teamID} not found!` })
            else
                res.json(data)
        })
        .catch(err => {
            res.status(500).json({ message: err.message || "Some error occurred while retrieving the team!" })
        })
};

exports.remove = (req, res) => {
    Team.destroy({ where: { id: req.params.teamID } })
        .then(num => {
            if (num == 1) {
                res.status(200).json({ message: `Team with id ${req.params.teamID} deleted with success` })
            } else {
                res.status(404).json({ message: `Team with id ${req.params.teamID} not found!` })
            }
        })
        .catch(err => {
            res.status(500).json({ message: err.message || "Some error occurred while deleting the team!" })
        })
};

exports.create = (req, res) => {
    Team.create(req.body)
        .then(data => {
            res.status(200).json({ message: "New team created", location: "/teams" + data.id })
        })
        .catch(err => {
            if (err.name === 'SequelizeValidationError')
                res.status(404).json({ message: err.errors[0].message });
            else
                res.status(500).json({ message: err.message || "Some error occurred while creating the team!" })
        })
};

exports.update = (req, res) => {
    if (!req.body || !req.body.name) {
        res.status(400).json({ message: "Name can not be empty!" });
        return;
    }

    Team.update(req.body, { where: { id: req.params.teamID } })
        .then(num => {
            if (num == 1) {
                res.status(200).json({
                    message: `Team id=${req.params.teamID} was updated successfully.`
                });
            } else {
                res.status(200).json({
                    message: `No updates were made on Team id=${req.params.teamID}.`
                });
            }
        })
};