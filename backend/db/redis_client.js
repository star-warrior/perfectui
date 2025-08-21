import redis from "redis"

const client = redis.createClient({ legacyMode: true })

client.on('connect', () => {
    console.log("Connected to Redis");
})

client.on('error', (e) => {
    console.error("Error occured in Redis: ", error);
})

client.connect();

export default client;