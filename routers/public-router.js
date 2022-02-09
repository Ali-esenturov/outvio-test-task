const express = require('express');
const router = express.Router();

const RateLimiter = require('../middlewares/rate-limiter');
const { PUBLIC_RL_TYPE } = require('../constants');


const publicRateLimiter = new RateLimiter({
    type: PUBLIC_RL_TYPE,
    limit: process.env.PUBLIC_RL_LIMIT
});

router.use(publicRateLimiter.checkRate);

router.get('/route/1', (req, res) => {
    console.log('this is public router 1');
    res.send('Public route 1 executed');
});

router.get('/route/2', (req, res) => {
    console.log('this is public router 2');
    res.send('Public route 2 executed');
});

router.get('/route/3', (req, res) => {
    console.log('this is public router 3');
    res.send('Public route 3 executed');
});

module.exports = router;