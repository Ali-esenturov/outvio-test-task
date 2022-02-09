const {
    TOKEN_FIELD,
    PUBLIC_RL_TYPE,
    PRIVATE_RL_TYPE,
    PUBLIC_RL_COLLECTION,
    PRIVATE_RL_COLLECTION,
    PUBLIC_RL_FIELD,
    PRIVATE_RL_FIELD
} = require('../constants');

const { checkRateViolation } = require('../services/violation-checker');


class RateLimiter {
    constructor({ type, limit }) {
        if (!type || !limit) {
            throw new Error('For buidling RateLimiter type and limit are required!');
        }
        if (![PUBLIC_RL_TYPE, PRIVATE_RL_TYPE].includes(type)) {
            throw new Error('Type of RateLimiter is not valid!');
        }

        this.collection = type === PUBLIC_RL_TYPE
            ? PUBLIC_RL_COLLECTION
            : PRIVATE_RL_COLLECTION;

        this.type = type;
        this.limit = limit;
    }

    checkRate = async (req, res, next) => {
        try {
            const userData = {};
            this.type === PUBLIC_RL_TYPE
                ? userData[PUBLIC_RL_FIELD] = req.socket.remoteAddress
                : userData[PRIVATE_RL_FIELD] = req.headers[TOKEN_FIELD];
            
            const { isViolated, nextAttemptTime } = await checkRateViolation({
                collection: this.collection,
                limit: this.limit,
                userData
            });
    
            if (isViolated) {
                res.send({
                    message: `Rate limit is violated! Next allowed time is ${nextAttemptTime}`
                });
            } else {
                next();
            }

        } catch (error) {
            res.status(400).send({
                message: 'There was an error! Please, try again.'
            });
        }
    }
}

module.exports = RateLimiter;