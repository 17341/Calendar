const db = require('../models/index');
const Exchange = db.Exchange;

exports.exchangeList = async function (req, res) {
    await Exchange.findAll()
        .then(data => {
            console.log("All exchanges:", JSON.stringify(data, null, 2));
            res.json(data);
        })
        .catch(err => {
            res.status(500).json({ message: err.message })
        })
};

exports.exchangeCreate = async function (req, res) {
    let exchange = await Exchange.create({
        status: req.query.status,
        event_id: req.query.event_id,
        exchange_id: req.query.exchange_id
    }).then(data => {
        console.log(exchange.toJSON());
        res.json(data);
    }).catch(err => {
        res.status(500).json({ message: err.message })
    })
};

exports.exchangeUpdate = async function (req, res) {
    if (req.params.exchange_id > 0) {
        await Exchange.update(
            req.query, { where: { exchange_id: req.params.exchange_id } }
        )
            .then(data => {
                res.json(data);
            })
            .catch(err => {
                res.status(500).json({ message: err.message })
            })
    }
    else res.status(400).json({ message: 'exchange not found' })
};

exports.exchangeDelete = async function (req, res) {
    if (req.params.exchange_id) {
        await Exchange.destroy({ where: { exchange_id: req.params.exchange_id } })
            .then(data => {
                res.json(data);
            })
            .catch(err => {
                res.status(500).json({ message: err.message })
            })
    }
    else res.status(400).json({ message: 'exchange not found' })
};