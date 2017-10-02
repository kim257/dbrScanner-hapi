import * as fs from 'fs';

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
    })
  })

  // todo write excel file

};

export {uploader}