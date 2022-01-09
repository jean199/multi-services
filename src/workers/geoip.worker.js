const geoip = require('geoip-lite');
const { parentPort, workerData } = require('worker_threads');

const result = geoip.lookup(workerData.ipOrDomains);
parentPort.postMessage({ geoip: result });
