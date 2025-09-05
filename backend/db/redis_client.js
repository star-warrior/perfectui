import redis from "redis"
import dotenv from "dotenv"

dotenv.config()

const client = redis.createClient({
    url: process.env.REDIS_URL || `redis://${process.env.REDIS_HOST || 'localhost'}:${process.env.REDIS_PORT || 6379}`,
    password: process.env.REDIS_PASSWORD || undefined,
    database: parseInt(process.env.REDIS_DB) || 0
})

client.on('connect', () => {
    console.log("Connected to Redis");
})

client.on('error', (e) => {
    console.error("Error occured in Redis: ", e);
})

client.connect();

export default client;