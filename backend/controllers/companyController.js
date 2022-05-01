const db = require('../models/index');
const Company = db.Company;

exports.companyList = async function (req, res) {
    await Company.findAll()
        .then(data => {
            console.log("All companies:", JSON.stringify(data, null, 2));
            res.json(data);
        })
        .catch(err => {
            res.status(500).json({ message: err.message })
        })
};

exports.companyCreate = async function (req, res) {
    let company = await Company.create({
        name: req.query.name,
        password: req.query.password,
    }).then(data => {
        console.log(company.toJSON());
        res.json(data);
    }).catch(err => {
        res.status(500).json({ message: err.message })
    })
};

exports.companyUpdate = async function (req, res) {
    if (req.params.company_id > 0) {
        await Company.update(
            req.query, { where: { company_id: req.params.company_id } }
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