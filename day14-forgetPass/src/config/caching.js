const Redis = require("ioredis");

let cacheInstance = new Redis({
  port: 14833, // Redis port
  host: "athletic-button-voyage-32548.db.redis.io", // Redis host
  password: "65K6UC5Yc0J4fBqHnXeS0G2pL7GOpX6Q",
});

module.exports = cacheInstance;