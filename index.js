const Redis = require("redis");
const RedisClient = Redis.createClient("redis://apollo.treggo.co");
const RedisClientWriter = Redis.createClient("redis://apollo.treggo.co");
const ptp = require("pdf-to-printer");
const path = require("path");
const fs = require("fs");
const axios = require("axios");
var readline = require('readline');
const colors = require("colors");

RedisClient.on("connect", async function() {
    console.log("Redis connected desde ", process.argv[2]);
    send(`Impresora ${process.argv[2]} iniciada`);
}).on('error', (e) => {
    console.log("Redis error", JSON.stringify(e));
})

RedisClient.on("message", async function(printer, shipment) {
  send(`${process.argv[2]}: Se recibe mensaje: ${JSON.stringify(shipment).length} bytes`);
  if(shipment === "exit"){
    send(`${process.argv[2]}: Se reinicia`);
    process.exit(0)
  }else{
    shipment = JSON.parse(shipment);
    const tmpFilePath = path.join(`C:/Users/Pc/Desktop/treggo-depo/tmp/${Math.random().toString(36).substr(7)}.pdf`);
    fs.writeFileSync(tmpFilePath, shipment.base64, 'base64');
    ptp.print(tmpFilePath, {printer: printer.replace("printer_", ""),win32: ['-print-settings fit']})
    .then((response) => {
      send(`Impresión en ${process.argv[2]}: ${shipment.delivery.address}`);
    })
    .catch((error) => {
      send(`Error en impresora ${process.argv[2]}: ${error.stack ? JSON.stringify(error.stack) : JSON.stringify(error)}`);
    });
  }
});

RedisClient.subscribe("printer_depo");

function send (text) {
  console.log(text);
  let url = "https://discord.com/api/webhooks/783056196914511902/OGpjuG5a0TSZgnGws4EQwGjggsB6pSD44HTqT1PNFWxRzs5HcTWvIhyXsowYC3f3YGEl"
  axios({
      'method': 'POST',
      "url": url,
      'data': {
          username: "Treggo impresora",
          avatar_url: "https://www.cetrogar.com.ar/media/catalog/product/c/m/cm2102.jpg?width=500&height=500&canvas=500:500&quality=80&bg-color=255,255,255&fit=bounds",
          content: `🖨 ${text}`
      }
  })
  .then((response) => {},  (err) => {console.log(err)})
  .catch((err) => {console.log(err)})
}

var rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
  terminal: false
});

rl.on('line', function(line){
  RedisClientWriter.lpush("ar_depo_scan_1",line.replace(/\'/g, '-').replace(/Ñ/g, ':').replace(/\*/g, '}').replace(/¨/g, '{').replace(/\?/g, '_').replace(/¨/g, '{').replace(/\[/g, '"'))
})