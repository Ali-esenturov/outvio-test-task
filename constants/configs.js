const configs = {
    APP_PORT: process.env.APP_PORT,
    
    PRIVATE_RL_LIMIT: process.env.PRIVATE_RL_LIMIT,
    PUBLIC_RL_LIMIT: process.env.PUBLIC_RL_LIMIT,
    RL_INTERVAL: process.env.RL_INTERVAL,

    DB_HOST: process.env.DB_HOST,
    DB_PORT: process.env.DB_PORT,
    DB_NAME: process.env.DB_NAME,
    
    VALID_TOKEN: process.env.VALID_TOKEN
}

module.exports = configs;