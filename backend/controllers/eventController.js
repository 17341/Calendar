const db = require('../models/index');
const Event = db.Event;

exports.eventList = async function (req, res) {
    await Event.findAll()
        .then(data => {
            console.log("All events:", JSON.stringify(data, null, 2));
            res.json(data);
        })
        .catch(err => {
            res.status(500).json({ message: err.message })
        })
};

exports.eventCreate = async function (req, res) {
    let event = await Event.create({
        start_at: req.query.start_at,
        end_at: req.query.end_at,
        description: req.query.description,
        status: req.query.status,
        event_id: req.query.event_id
    }).then(data => {
        console.log(event.toJSON());
        res.json(data);
    }).catch(err => {
        res.status(500).json({ message: err.message })
    })
};

exports.eventUpdate = async function (req, res) {
    if (req.params.event_id > 0) {
        await Event.update(
            req.query, { where: { event_id: req.params.event_id } }
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