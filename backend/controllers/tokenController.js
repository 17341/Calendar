const db = require('../models/index');
const Token = db.Token;


exports.tokenAdd = async function (req, res) {
    await Token.findOne({ where: { email: req.body.email } })
        .then((obj) => {
            if (obj)
                return obj.update({ refreshToken: req.body.token });
            return Token.create({ email: req.body.email, refreshToken: req.body.token });
        }).catch((err) => { });
};

exports.tokenSearch = async function (req, res, next) {
    await Token.findOne({
        where: {
            refreshToken: req.body.refreshToken,
        }
    })
        .then(data => {
            if (data) {
                next()
            } else {
                res.status(404).json({ message: "Incorrect token" })
            }
        })
        .catch(err => {
            res.status(500).json({ message: err.message })
        })
};

exports.tokenDelete = async function (req, res) {
    await Token.destroy({ where: { refreshToken: req.body.refreshToken } })
        .then(() => {
            res.cookie('accessToken', "")
            res.cookie('refreshToken', "")
            res.send({ message: "Token deleted" })
        })
        .catch(err => {
            res.status(500).json({ message: err.message })
        })
};

exports.userByToken = async function (req, res) {
    await Token.findOne({
        where: {
            refreshToken: req.body.refreshToken,
        }
    })
        .then(data => {
            if (data) {
                res.json(data);
            } else {
                res.status(404).json({ message: "Incorrect token" })
            }
        })
        .catch(err => {
            res.status(500).json({ message: err.message })
        })
};