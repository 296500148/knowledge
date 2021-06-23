var sharedWroker = new SharedWorker("./worker.js");

console.log(sharedWroker);

sharedWroker.port.postMessage("hello I'm index2.js");

sharedWroker.port.onmessage = function (e) {
  console.log("on message in index2.js", e);
}