const { ObjectId } = require('mongodb');
const moment = require('moment');

const { DB_NAME, RL_INTERVAL } = require('../constants/configs');
const mongoClient = require('../db/mongo-client');

const db = mongoClient.getDb(DB_NAME);


async function checkRateViolation({ collection, limit, userData }) {
    try {
        const queryResult = await db
            .collection(collection)
            .findOneAndUpdate(
                userData,
                {
                    '$inc': { attempts_count: 1 },
                    '$setOnInsert': {
                        ...userData,
                        attempt_time: new Date()
                    }
                },
                {
                    upsert: true,
                    returnDocument: 'after'
                }
            );
        
        const result = {
            isViolated: false
        };
        
        const { _id, attempts_count, attempt_time } = queryResult.value;
        console.log('attempts_count: ', attempts_count);

        if (attempts_count <= limit) {
            return result;
        }

        console.log(`Initial attempt time: ${attempt_time}`);
        const diffInMinutes = calculateDiffInMinutes(attempt_time);
        console.log(`Difference in minutes: ${diffInMinutes}`);

        if (diffInMinutes > RL_INTERVAL) {
            await resetAttemptTime(collection, _id);
            return result;
        }

        const nextAttemptTime = moment(attempt_time).add(RL_INTERVAL, 'minutes').toDate();
        result.isViolated = true;
        result.nextAttemptTime = nextAttemptTime;
        return result;

    } catch (error) {
        console.log(error.message);
        throw new Error('Something went wrong while checking rate violation!');
    }
}

function calculateDiffInMinutes(attemptTime) {
    const nowMoment = moment(new Date());
    const attemptMoment = moment(attemptTime);

    const duration = moment.duration(nowMoment.diff(attemptMoment));
    return duration.asMinutes();
}

async function resetAttemptTime(collection, id) {
    const res = await db
        .collection(collection)
        .findOneAndUpdate(
            {
                _id: ObjectId(id)
            },
            {
                '$set': {
                    attempts_count: 1,
                    attempt_time: new Date()
                }
            }
        );
}

module.exports = {
    checkRateViolation
}