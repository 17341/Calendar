let express = require('express');
let router = express.Router();

// Import controllers
const userController = require('./controllers/userController');
const companyController = require('./controllers/companyController');
const eventController = require('./controllers/eventController');
const exchangeController = require('./controllers/exchangeController');

router.get('/', (req, res) => res.redirect('/user'));
router.get('/user', userController.userList);
router.get('/event', eventController.eventList);
router.get('/company', companyController.companyList);
router.get('/exchange', exchangeController.exchangeList);

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


module.exports = router;