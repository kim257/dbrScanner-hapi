"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const fs = require("fs");
const uploader = function (file, options) {
    const fileStream = fs.createWriteStream(`${options.dest}/${file.hapi.filename}`);
    return new Promise((resolve, reject) => {
        file.on('error', function (err) {
            reject(err);
        });
        file.pipe(fileStream);
        file.on('end', function (err) {
            const fileDetails = {
                fieldname: file.hapi.name,
                originalname: file.hapi.filename,
            };
            resolve(fileDetails);
        });
    });
    // todo write excel file
};
exports.uploader = uploader;
//# sourceMappingURL=fileHelper.js.map