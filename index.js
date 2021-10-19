var HID = require('node-hid');
var devices = HID.devices();

let path = devices[1].path
var device = new HID.HID(path);

for(device of devices){
  console.log("Leyendo de",path)
  device.on("data", function(data) {
    console.log("Leyo algo de data",data)
  });
  device.on("error", function(err) {
    console.log(err)
  });
}
