const db = require('../models/index');
const Company = db.Company;

exports.companyList = async function (req, res) {
    await Company.findAll()
        .then(data => {
            res.json(data);
        })
        .catch(err => {
            res.status(500).json({ message: err.message })
        })
};

exports.companyCreate = async function (req, res) {
    await Company.create({
        name: req.body.name,
        password: req.body.password,
    }).then(data => {
        res.json(data);
    }).catch(err => {
        res.status(500).json({ message: err.message })
    })
};

exports.companyUpdate = async function (req, res) {
    if (req.params.company_id > 0) {
        await Company.update(
            req.body, { where: { company_id: req.params.company_id } }
        )
            .then(data => {
                res.json(data);
            })
            .catch(err => {
                res.status(500).json({ message: err.message })
            })
    }
    else res.status(400).json({ message: 'company not found' })
};

exports.companyDelete = async function (req, res) {
    if (req.params.company_id) {
        await Company.destroy({ where: { company_id: req.params.company_id } })
            .then(data => {
                res.json(data);
            })
            .catch(err => {
                res.status(500).json({ message: err.message })
            })
    }
    else res.status(400).json({ message: 'company not found' })
};

exports.companyEvents = async function (req, res) {
    await db.Company.findAll({
        where: { company_id: req.params.company_id },
        include: { model: db.User }
    })
        .then(data => {
            db.User.findAll({
                where: { company_id: req.params.company_id },
                include: { model: db.Event }
            })
                .then(data => {
                    res.json(data)
                })
                .catch(err => {
                    res.status(500).json({ 'message': err.message })
                })
        })
        .catch(err => {
            res.status(500).json({ 'message': err.message })
        })
}