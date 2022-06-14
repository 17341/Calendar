const db = require('../models/index');
const Exchange = db.Exchange;

exports.exchangeList = async function (req, res) {
    await Exchange.findAll()
        .then(data => {
            res.json(data);
        })
        .catch(err => {
            res.status(500).json({ message: err.message })
        })
};

exports.exchangeCreate = async function (req, res) {
    await Exchange.create({
        status: req.body.status,
        event_id: req.body.event_id,
        from_user_id: req.body.from_user_id,
        to_user_id: req.body.to_user_id
    }).then(data => {
        res.json(data);
    }).catch(err => {
        res.status(500).json({ message: err.message })
    })
};

exports.exchangeUpdate = async function (req, res) {
    if (req.params.exchange_id > 0) {
        await Exchange.update(
            req.body, { where: { exchange_id: req.params.exchange_id } }
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

// exports.userExchanges = async function (req, res) {
//     await db.Exchange.findAll({
//         where: { to_user_id: req.params.user_id }
//     })
//         .then(data => {
//             res.json(data)
//         })
//         .catch(err => {
//             res.status(500).json({ 'message': err.message })
//         })
// }

// exports.myExchanges = async function (req, res) {
//     await db.Exchange.findAll({
//         where: { from_user_id: req.params.user_id }
//     })
//         .then(data => {
//             res.json(data)
//         })
//         .catch(err => {
//             res.status(500).json({ 'message': err.message })
//         })
// }