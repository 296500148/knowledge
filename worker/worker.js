onmessage =  function(...arg){
  console.log("get message from main : ",...arg);
  setTimeout(function(){
    postMessage("post message on weoker after 5s");
  },5000)
}