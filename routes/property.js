const router = require('express').Router();
const propertyControllers = require('../controllers/propertycontrollers');

router.get('/', propertyControllers.getAllProperty);
router.post('/add', propertyControllers.add);
router.post('/apply', propertyControllers.applyForProperty);
router.get('/getapplied?:id', propertyControllers.getUserAppliedProperty);

module.exports = router;