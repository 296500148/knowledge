onconnect = function(e){
  console.log("on worker,",e);
  var port = e.ports[0];
  port.onmessage = function () {
    port.postMessage("123");
  }
}