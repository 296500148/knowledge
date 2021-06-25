let start = Date.now();

const language = navigator.language;

const dateFromatOptions = {
  year: 'numeric', month: 'numeric', day: 'numeric',
  hour: 'numeric', minute: 'numeric', second: 'numeric',
  hour12: false
}
const dateFormater = new Intl.DateTimeFormat(language, dateFromatOptions)

function getTime(){
  return dateFormater.format(new Date());
}
function onMessage(){
  const now = Date.now();
  console.log(getTime() + ": delay " + (now-start) + " ms");
  start = now;
}

window.post = function(){};

window.startMessageChannel = function startMessageChannel(){
  console.log("change post method: MessageChannel");
  const channel = new MessageChannel();
  const port = channel.port2;
  channel.port1.onmessage = onMessage;
  window.post = function(){
    start = Date.now();
    port.postMessage(null);
  };
}

window.startSetTimeOut =  function startSetTimeOut(){
  console.log("change post method: setTimeout");
  window.post = function(){
    start = Date.now();
    setTimeout(function(){
      onMessage();
    },0)
  }
}

window.setRequestIdleCallback = function() {
  console.log("change post method: requestIdleCallback");
  window.post = function(){
    start = Date.now();
    requestIdleCallback(function(){
      onMessage();
    }, { timeout:0})
  }
}

window.setRequestAnimationFrame = function(){
  console.log("change post method: requestAnimationFrame");
  window.post = function () {
    start = Date.now();
    requestAnimationFrame(function () {
      onMessage();
    })
  }
}