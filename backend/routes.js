require('dotenv').config()

let express = require('express');
let router = express.Router();
const jwt = require('jsonwebtoken')

// Import controllers
const userController = require('./controllers/userController');
const companyController = require('./controllers/companyController');
const eventController = require('./controllers/eventController');
const exchangeController = require('./controllers/exchangeController');

function authenticateToken(req, res, next) {
    const authHeader = req.headers['authorization']
    const token = authHeader && authHeader.split(' ')[1]
    if (token == null) return res.sendStatus(401)

    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
        if (err) return res.sendStatus(403)
        req.user = user
        next()
    })
}

router.get('/', authenticateToken, (req, res) => res.status(200).send({ message: 'Auth success' }));
router.get('/user', authenticateToken, userController.userList);
router.get('/event', authenticateToken, eventController.eventList);
router.get('/company', authenticateToken, companyController.companyList);
router.get('/exchange', authenticateToken, exchangeController.exchangeList);

router.post('/user', userController.userCreate);
router.post('/company', companyController.companyCreate);
router.post('/event', eventController.eventCreate);
router.post('/exchange', exchangeController.exchangeCreate);

router.put('/user/:user_id', userController.userUpdate);
router.put('/event/:event_id', eventController.eventUpdate);
router.put('/company/:company_id', companyController.companyUpdate);
router.put('/exchange/:exchange_id', exchangeController.exchangeUpdate);


router.delete('/user/:user_id', userController.userDelete);
router.delete('/event/:event_id', eventController.eventDelete);
router.delete('/company/:company_id', companyController.companyDelete);
router.delete('/exchange/:exchange_id', exchangeController.exchangeDelete);

router.post('/login', userController.userLogin);

module.exports = router;