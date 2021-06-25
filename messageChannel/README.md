# MessageChannel的用途

最近在看react源码,发现react使用的Scheduler(react的任务调度器)里使用了这个

``` javascript
  if (typeof setImmediate === 'function') {
  // Node.js and old IE.
  // There's a few reasons for why we prefer setImmediate.
  //
  // Unlike MessageChannel, it doesn't prevent a Node.js process from exiting.
  // (Even though this is a DOM fork of the Scheduler, you could get here
  // with a mix of Node.js 15+, which has a MessageChannel, and jsdom.)
  // https://github.com/facebook/react/issues/20756
  //
  // But also, it runs earlier which is the semantic we want.
  // If other browsers ever implement it, it's better to use it.
  // Although both of these would be inferior to native scheduling.
  schedulePerformWorkUntilDeadline = () => {
    setImmediate(performWorkUntilDeadline);
  };
} else {
  const channel = new MessageChannel();
  const port = channel.port2;
  channel.port1.onmessage = performWorkUntilDeadline;
  schedulePerformWorkUntilDeadline = () => {
    port.postMessage(null);
  };
}
```

api具体说明看下面的链接👇:
https://developer.mozilla.org/zh-CN/docs/Web/API/MessageChannel

## 用途

为什么react要特别使用这个api呢?🧐(假设你知道requestAnimationFrame以及requestIdleCallback)

下面的这篇文章里有说到:
https://react.iamkasong.com/preparation/newConstructure.html#scheduler-%E8%B0%83%E5%BA%A6%E5%99%A8

关于requestIdleCallback我已经写过一个demo测试过其性能了👇:
https://github.com/296500148/knowledge/tree/master/requestIdleCallback

*requestAnimationFrame后面有机会补上*

**本demo用于测试MessageChannel,对比setTimeout,requestIdleCallback,requestAnimationFrame**