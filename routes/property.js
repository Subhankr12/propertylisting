const router = require('express').Router();
const propertyControllers = require('../controllers/propertycontrollers');

router.get('/', propertyControllers.getAllProperty);
router.post('/add', propertyControllers.add);
router.post('/apply', propertyControllers.applyForProperty);
router.get('/getapplied?:id', propertyControllers.getUserAppliedProperty);
router.get('/getpropertystatus?:id', propertyControllers.getPropertyStatus);
router.post('/setstatus', propertyControllers.setUserStatus);

module.exports = router;