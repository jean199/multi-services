const { parentPort, workerData } = require('worker_threads');
const ping = require('ping');

ping.promise
  .probe(workerData.ipOrDomains)
  .then((result) => parentPort.postMessage({ ping: result }));
