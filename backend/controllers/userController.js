const db = require('../models/index');
const User = db.User;
const Company = db.Company;

exports.userList = async function (req, res) {
    await User.findAll()
        .then(data => {
            console.log("All users:", JSON.stringify(data, null, 2));
            res.json(data);
        })
        .catch(err => {
            res.status(500).json({ message: err.message })
        })
};

exports.userLogin = async function (req, res) {
    await User.findOne({
        where: {
            email: req.body.email,
            password: req.body.password
        }
    })
        .then(data => {
            res.json(data);
        })
        .catch(err => {
            res.status(500).json({ message: err.message })
        })
};

exports.userCreate = async function (req, res) {
    await User.create({
        last_name: req.body.last_name,
        first_name: req.body.first_name,
        email: req.body.email,
        password: req.body.password,
        role: req.body.role
    }).then(data => {
        res.json(data);
    }).catch(err => {
        res.status(500).json({ message: err.message })
    })

};

exports.userUpdate = async function (req, res) {
    if (req.params.user_id > 0) {
        await User.update(
            req.query, { where: { user_id: req.params.user_id } }
        )
            .then(data => {
                res.json(data);
            })
            .catch(err => {
                res.status(500).json({ message: err.message })
            })
    }
    else res.status(400).json({ message: 'User not found' })
};

exports.userDelete = async function (req, res) {
    if (req.params.user_id) {
        await User.destroy({ where: { user_id: req.params.user_id } })
            .then(data => {
                res.json(data);
            })
            .catch(err => {
                res.status(500).json({ message: err.message })
            })
    }
    else res.status(400).json({ message: 'User not found' })
};

