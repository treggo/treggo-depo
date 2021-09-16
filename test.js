const fs = require('fs');
const Redis = require("redis");

const RedisClient = Redis.createClient("redis://apollo.treggo.co");
RedisClient.on("connect", function() {
    global.redis = RedisClient; 
    console.log("Redis","connected");

    const contents = fs.readFileSync('file.pdf', {encoding: 'base64'});

    global.redis.publish("printer_depo", contents);

}).on('error', (e) => {
    console.log("Redis", JSON.stringify(e));
})
RedisClient.on("error", function (err) {console.log(err)});