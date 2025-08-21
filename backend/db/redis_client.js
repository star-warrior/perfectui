import redis from "redis"

const client = redis.createClient()

client.on('connect', () => {
    console.log("Connected to Redis");
})

client.on('error', (e) => {
    console.error("Error occured in Redis: ", e);
})

client.connect();

export default client;