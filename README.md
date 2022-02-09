Dear user,

===============================================================================

INFO:

This is my solution to the test task for Outvio.
The main goal was to implement a Request Rate Limiter to secure our REST API.

===============================================================================

HOW TO USE:

First, you need to make sure that environment variables are defined:
    - APP_PORT;
    - DB_HOST;
    - DB_PORT;
    - DB_NAME;
    - PRIVATE_RL_LIMIT;
    - PUBLIC_RL_LIMIT;
    - RL_INTERVAL;
    - VALID_TOKEN.

You need to use the valid token to make authorized requests.

There are 6 [GET] end points you can use for testing:
    - /public/route/1
    - /public/route/2
    - /public/route/3
    - /private/route/1
    - /private/route/2
    - /private/route/3

To run/stop the application please use 'docker-compose up/down' commands.