const { TOKEN_FIELD } = require('../constants');

const VALID_TOKEN_VALUE = process.env.VALID_TOKEN;


const validateToken = (req, res, next) => {
    console.log(`this is accepted token: ${req.headers[TOKEN_FIELD]}`);
    
    if (req.headers[TOKEN_FIELD] && req.headers[TOKEN_FIELD] === `Bearer ${VALID_TOKEN_VALUE}`) {
        console.log('accepted token is valid!');
        next();
    } else {
        console.log('accepted valid is not valid!');
        return res.status(401).send("Not authorized");
    }
}


module.exports = validateToken;