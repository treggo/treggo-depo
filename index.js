var HID = require('node-hid');
var devices = HID.devices();

for (dev of devices) {
  try {
    var device = new HID.HID(dev.path);
    device.on("data", function (data) {
      console.log("Leyo algo de data", data)
    });
    device.on("error", function (err) {
      console.log(err)
    });
  } catch (err) {

  }
}
