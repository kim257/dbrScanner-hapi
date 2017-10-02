"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const Hapi = require("hapi");
// Lodash
const lodash_1 = require("lodash");
// import {uploader} from "./fileHelper";
const server = new Hapi.Server();
// DBR
const dbr = require('node-cpp/build/Release/dbr');
//dbr.initLicense("t0068MgAAAGvV3VqfqOzkuVGi7x/PFfZUQoUyJOakuduaSEoI2Pc8+kMwjrojxQgE5aJphmhagRmq/S9lppTkM4w3qCQezxk=");
// Promisify
const { promisify } = require('util');
//const decodeFilePromise = promisify(dbr.decodeFileAsync);
// setup
const fileOptions = { dest: `uploads` };
const port = 3000;
const host = 'localhost';
server.connection({ port, host });
server.route({
    method: 'POST',
    path: '/barcode',
    config: {
        payload: {
            allow: 'multipart/form-data',
            maxBytes: 11000000,
            output: 'stream',
            parse: true
        },
    },
    handler: (request, reply) => __awaiter(this, void 0, void 0, function* () {
        try {
            // const fileImage = request.payload['image'];
            // const uploadFile = await uploader(fileImage, fileOptions);
            //
            const oneDimensionType = 0x3FF;
            const scannedResults = []; // await decodeFilePromise('test.jpg', oneDimensionType);
            const imeiResults = lodash_1.default.uniq(lodash_1.default.map(lodash_1.default.filter(scannedResults, ['format', 'CODE_128']), 'value'));
            //
            reply(null, imeiResults);
        }
        catch (err) {
        }
    })
});
server.start((err) => {
    if (err) {
        throw err;
    }
    console.log(`Server running at: ${server.info.uri}`);
});
//# sourceMappingURL=server.js.map