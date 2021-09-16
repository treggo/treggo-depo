// Import the zebra-browser-prit-wrapper package
const  ZebraBrowserPrintWrapper = require('zebra-browser-print-wrapper').default;
console.log(ZebraBrowserPrintWrapper)
const printBarcode = async (serial) => {

        // Create a new instance of the object
        const browserPrint =  new ZebraBrowserPrintWrapper();

        // Select default printer
        const defaultPrinter =  await browserPrint.getDefaultPrinter();
    
        // Set the printer
        browserPrint.setPrinter(defaultPrinter);

        // Check printer status
        const printerStatus = await browserPrint.checkPrinterStatus();

        // Check if the printer is ready
        if(printerStatus.isReadyToPrint) {

            // ZPL script to print a simple barcode
            const zpl = `^XA
                        ^BY2,2,100
                        ^FO20,20^BC^FD${serial}^FS
                        ^XZ`;

            browserPrint.print(zpl);
        } else {
        console.log("Error/s", printerStatus.errors);
        }

};

const serial = "0123456789";

printBarcode(serial);