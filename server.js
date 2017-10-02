const Hapi = require('hapi');

// Lodash
const _ = require('lodash');
const server = new Hapi.Server();

// DBR
const dbr = require('./node-cpp/build/Release/dbr');
dbr.initLicense("t0068MgAAAGvV3VqfqOzkuVGi7x/PFfZUQoUyJOakuduaSEoI2Pc8+kMwjrojxQgE5aJphmhagRmq/S9lppTkM4w3qCQezxk=");

// Promisify
const {promisify} = require('util');
const decodeFilePromise = promisify(dbr.decodeFileAsync);

// setup
const port = 3000;
const host = '0.0.0.0';

server.connection({port, host});

server.route({
  method: 'GET',
  path: '/promise',
  handler: async (request, reply) => {
    try {
      const oneDimensionType = 0x3FF;
      console.log('start promise >>');
      decodeFilePromise('test.jpg', oneDimensionType).then((res) => {
        console.log('res', res);
        reply(null, res);
      }).catch((err) => {
        console.log('err', err);
      });

    } catch (err) {
      console.info('err', err);
    }
  }
});


server.route({
  method: 'GET',
  path: '/await',
  handler: async (request, reply) => {
    try {
      const oneDimensionType = 0x3FF;
      console.log('start await >>');
      const scannedResults = await decodeFilePromise('test.jpg', oneDimensionType);
      console.log('scannedResults await function', scannedResults);
      const imeiResults = _.uniq(_.map(_.filter(scannedResults, ['format', 'CODE_128']), 'value'));
      reply(null, imeiResults);
    } catch (err) {
      console.info('err', err);
    }
  }
});


server.start((err) => {
  if (err) {
    throw err;
  }
  console.log(`Server running at: ${server.info.uri}`);
});
