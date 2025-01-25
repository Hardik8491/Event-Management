// import redis from "ioredis";
// import dotenv from "dotenv";

// dotenv.config();

// const redisClient = () => {
//   if (process.env.REDIS_URL) {
//     console.log("Redis are connected");
//     return process.env.REDIS_URL;
//   }
//   throw new Error("Redis not connected");
// };

// export const redisConnection = new redis(redisClient());

// export default redisClient;
import redis from "ioredis";
import dotenv from "dotenv";
dotenv.config();

const getRedisUrl = () => {
    if (process.env.REDIS_URL) {
        console.log("Redis are connected");
        return process.env.REDIS_URL;
    }
    throw new Error("Redis not connected");
};

const redisClient = new redis(getRedisUrl());

export default redisClient;

