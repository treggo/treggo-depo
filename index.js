const Redis = require("redis");
const RedisClient = Redis.createClient("redis://apollo.treggo.co");

RedisClient.on("connect", function() {
    console.log("Redis connected");
}).on('error', (e) => {
    console.log("Redis error", JSON.stringify(e));
})

RedisClient.on("message", function(printer, zpl) {
  console.log("Subscriber received message in channel '" + printer + "': " + zpl);
});

RedisClient.subscribe("printer_zpl_234_jetsmartj");
