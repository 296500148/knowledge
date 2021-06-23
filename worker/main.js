var worker = new Worker("./worker.js");
var body = document.body;
var mainHtml = document.createElement("div");
var workerHtml = document.createElement("div");

body.appendChild(mainHtml);
body.appendChild(workerHtml);

worker.addEventListener("message",function(...args){
  console.log(args);
  workerHtml.innerHTML += JSON.stringify(args) + "\n";
})

var button = document.createElement("button");

button.addEventListener("click",function(){
  var m = "postmessage on main.js";
  mainHtml.innerHTML += m + "\n";
  worker.postMessage(m);
})
button.innerHTML = "click";
body.appendChild(button);

setTimeout(function(){
  worker.terminate();
},10000)