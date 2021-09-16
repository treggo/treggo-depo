const Redis = require("redis");
const RedisClient = Redis.createClient("redis://apollo.treggo.co");
const ptp = require("pdf-to-printer");

RedisClient.on("connect", async function() {
    console.log("Redis connected");
    console.log( await ptp.getPrinters())
}).on('error', (e) => {
    console.log("Redis error", JSON.stringify(e));
})

RedisClient.on("message", function(printer, zpl) {
  console.log("Subscriber received message in channel '" + printer + "': " + zpl);
});

RedisClient.subscribe("printer_zpl_234_jetsmartj");
