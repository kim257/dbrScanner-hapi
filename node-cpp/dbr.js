// Barcode DBR
const dbr = require('./build/Release/dbr');

// Utility libraries
const _ = require('lodash');

dbr.initLicense("f0068MgAAANb1uCbq6GkSj+MKoi94I7Q0bc1ixmsks46bJPrDk2IMx7EB9hp3kWtCLUyIEVQBBQGtVRWrv5bWUTtbxhV8Sis=");

function barcodeScan(pathFile, res, userProfile) {
    const oneDimensionBarcodeType = 0x3FF;
    dbr.decodeFileAsync(pathFile, oneDimensionBarcodeType, function (msg) {
            const response = _.uniq(_.map(_.filter(msg, ['format', 'CODE_128']), 'value'));
            console.log('response >> ', response);
            res.json({res: response});

            const datetime = moment().tz("Asia/Bangkok").format();
            const logLine = `${datetime},
            ${pathFile},
            ${(response || 'IMEI not found')},
            ${userProfile.userName},
            ${userProfile.userNodeID},
            ${userProfile.userProfileName},
            \r\n`;

            fs.appendFile('./log.csv',
                logLine,
                'utf8',
                function (err) {
                    if (err) {
                        return console.log('error dbr.decodeFileAsync fs.appendFile', err);
                    }
                }
            );
        }
    );
}

exports.dbrScan = barcodeScan;

