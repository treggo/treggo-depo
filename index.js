var HID = require('node-hid');
var devices = HID.devices();

let path = devices[0].path
var device = new HID.HID(path);

console.log("Leyendo de",path)
device.on("data", function(data) {
  console.log("Leyo algo de data",data)
});