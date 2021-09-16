const Redis = require("redis");
const RedisClient = Redis.createClient("redis://apollo.treggo.co");
const ptp = require("pdf-to-printer");
const path = require("path");
const fs = require("fs");

RedisClient.on("connect", async function() {
    console.log("Redis connected");
    console.log( await ptp.getPrinters())
}).on('error', (e) => {
    console.log("Redis error", JSON.stringify(e));
})

RedisClient.on("message", async function(printer, base64) {
  console.log("Subscriber received message in channel '" + printer + "': " + base64.slice(0, 10)+"...");
  const tmpFilePath = path.join(`./tmp/${Math.random().toString(36).substr(7)}.pdf`);
  fs.writeFileSync(tmpFilePath, base64, 'base64');

  await ptp.print(tmpFilePath, {printer: `"Xerox Phaser 3020"`});
});

RedisClient.subscribe("printer_zpl_234_jetsmartj");
