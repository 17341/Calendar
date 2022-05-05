const db = require('../models/index');
const User = db.User;

exports.userList = async function (req, res) {
    await User.findAll()
        .then(data => {
            res.json(data);
        })
        .catch(err => {
            res.status(500).json({ message: err.message })
        })
};

exports.userLogin = async function (req, res, next) {
    await User.findOne({
        where: {
            email: req.body.email,
            password: req.body.password
        }
    })
        .then(data => {
            if (data) {
                next()
            }
            else {
                res.status(404).json({ message: "Incorrect login" })
            }
        })
        .catch(err => {
            res.status(500).json({ message: err.message })
        })
};

exports.userCreate = async function (req, res) {
    await User.findOrCreate({
        where: { email: req.body.email }, defaults: {
            last_name: req.body.last_name,
            first_name: req.body.first_name,
            email: req.body.email,
            password: req.body.password,
            role: req.body.role
        }

    }).then(data => {
        res.json(data);
    }).catch(err => {
        res.status(500).json({ message: err.message })
    })

};

exports.userUpdate = async function (req, res) {
    if (req.params.user_id > 0) {
        await User.update(
            req.body, { where: { user_id: req.params.user_id } }
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

