const express = require('express');
const router = express.Router();

const RateLimiter = require('../middlewares/rate-limiter');
const validateToken = require('../middlewares/auth');
const { PRIVATE_RL_TYPE } = require('../constants');


router.use(validateToken);

const privateRateLimiter = new RateLimiter({
    type: PRIVATE_RL_TYPE,
    limit: process.env.PRIVATE_RL_LIMIT
});

router.use(privateRateLimiter.checkRate);

router.get('/route/1', (req, res) => {
    console.log('this is private router 1');
    res.send('Private route 1 executed');
});

router.get('/route/2', (req, res) => {
    console.log('this is private router 2');
    res.send('Private route 2 executed');
});

router.get('/route/3', (req, res) => {
    console.log('this is private router 3');
    res.send('Private route 3 executed');
});

module.exports = router;