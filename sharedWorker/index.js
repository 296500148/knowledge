var sharedWroker = new SharedWorker("./worker.js");

console.log(sharedWroker);

sharedWroker.port.postMessage("hello I'm index.js");

sharedWroker.port.onmessage = function(...e){
  console.log("on message in index.js",e);
}