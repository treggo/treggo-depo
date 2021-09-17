const Redis = require("redis");
const RedisClient = Redis.createClient("redis://apollo.treggo.co");
const ptp = require("pdf-to-printer");
const path = require("path");
const fs = require("fs");

RedisClient.on("connect", async function() {
    console.log("Redis connected desde ", process.argv[2]);
}).on('error', (e) => {
    console.log("Redis error", JSON.stringify(e));
})

RedisClient.on("message", async function(printer, base64) {
  console.log("Subscriber received message in channel '" + printer + "': " + base64.slice(0, 10)+"...");
  const tmpFilePath = path.join(`C:/Users/Pc/Desktop/treggo-depo/tmp/${Math.random().toString(36).substr(7)}.pdf`);
  fs.writeFileSync(tmpFilePath, base64, 'base64');
  ptp.print("file.pdf", {printer: `depo`,win32: []}).then(console.log).catch(console.error);
});

RedisClient.subscribe("printer_depo");
