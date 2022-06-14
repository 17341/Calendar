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
router.get('/event/:event_id', authenticateToken, eventController.eventSearch);
router.get('/company', authenticateToken, companyController.companyList);
router.get('/company/:company_id/events', authenticateToken, companyController.companyEvents);
router.get('/exchange', authenticateToken, exchangeController.exchangeList);
// router.get('/exchange/:user_id/received', authenticateToken, exchangeController.userExchanges);
// router.get('/exchange/:user_id/sent', authenticateToken, exchangeController.userExchanges);

router.post('/user', userController.userCreate);
router.post('/company', authenticateToken, companyController.companyCreate);
router.post('/event', authenticateToken, eventController.eventCreate);
router.post('/exchange', authenticateToken, exchangeController.exchangeCreate);

router.put('/user/:user_email', authenticateToken, userController.userUpdate);
router.put('/event/:event_id', authenticateToken, eventController.eventUpdate);
router.put('/company/:company_id', authenticateToken, companyController.companyUpdate);
router.put('/exchange/:exchange_id', authenticateToken, exchangeController.exchangeUpdate);


router.delete('/user/:user_id', authenticateToken, userController.userDelete);
router.delete('/event/:event_id', authenticateToken, eventController.eventDelete);
router.delete('/company/:company_id', authenticateToken, companyController.companyDelete);
router.delete('/exchange/:exchange_id', authenticateToken, exchangeController.exchangeDelete);

router.post('/login', userController.userLogin);

module.exports = router;