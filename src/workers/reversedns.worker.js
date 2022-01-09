const { parentPort, workerData } = require('worker_threads');
const dnsService = require('dns');

dnsService.reverse(workerData.ipOrDomains, (err, result) => {
  parentPort.postMessage({ reverseDns: result });
});
