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

RedisClient.on("message", async function(printer, shipment) {
  shipment = JSON.parse(shipment);
  console.log("Subscriber received message in channel '" + printer + "': " + shipment.delivery.address);
  //if(printer === "exit"){
    const tmpFilePath = path.join(`C:/Users/Pc/Desktop/treggo-depo/tmp/${Math.random().toString(36).substr(7)}.pdf`);
    fs.writeFileSync(tmpFilePath, shipment.base64, 'base64');
    ptp.print(tmpFilePath, {printer: `depo`,win32: ['-print-settings fit']}).then(console.log).catch(console.error);
  //}else{
  //  process.exit(0)
  //}
});

RedisClient.subscribe("printer_depo");
