const router = require('express').Router();

const { checkoutSession } = require('../../controllers/checkout-controller');


router.route('/').post(checkoutSession);


module.exports = router;