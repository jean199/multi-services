const { parentPort, workerData } = require('worker_threads');
const lookup = require('web-whois');

lookup(workerData.ipOrDomains).then(result =>{
    parentPort.postMessage({rdap: result});
});

