const db = require('../models/index');
const Event = db.Event;

exports.eventList = async function (req, res) {
    await Event.findAll()
        .then(data => {
            res.json(data);
        })
        .catch(err => {
            res.status(500).json({ message: err.message })
        })
};

exports.eventCreate = async function (req, res) {
    await Event.create({
        start_at: req.body.start_at,
        end_at: req.body.end_at,
        description: req.body.description,
        status: req.body.status,
        user_id: req.body.user_id
    }).then(data => {

        res.json(data);
    }).catch(err => {
        res.status(500).json({ message: err.message })
    })
};

exports.eventUpdate = async function (req, res) {
    if (req.params.event_id > 0) {
        await Event.update(
            req.body, { where: { event_id: req.params.event_id } }
        )
            .then(data => {
                res.json(data);
            })
            .catch(err => {
                res.status(500).json({ message: err.message })
            })
    }
    else res.status(400).json({ message: 'event not found' })
};
exports.eventSearch = async function (req, res) {
    if (req.params.event_id > 0) {
        await Event.findOne(
            { where: { event_id: req.params.event_id }, include: { model: db.User } }
        )
            .then(data => {
                //console.log(data)
                res.json(data);
            })
            .catch(err => {
                res.status(500).json({ message: err.message })
            })
    }
    else res.status(400).json({ message: 'event not found' })
};

exports.eventDelete = async function (req, res) {
    if (req.params.event_id) {
        await Event.destroy({ where: { event_id: req.params.event_id } })
            .then(data => {
                res.json(data);
            })
            .catch(err => {
                res.status(500).json({ message: err.message })
            })
    }
    else res.status(400).json({ message: 'event not found' })
};