# 你真的懂setTimeOut吗？

(声明:以下的情景假设setTimeout的回调能够瞬间执行完哈🌝避免引出多余的概念)

在我还是小白的时候接触到了setTimeout，我以为你给他设了多少延时,他就在多少延时后准时的执行

![img](./a.jpeg)

后来我有一天我看到了有人说settime的最小延时实际是4ms:

![img](./b.jpeg)

并为自己又掌握了一项没什么用的冷知识而骄傲:

![img](./c.jpeg)

...说实话,我也不知道哪来的自信

![img](./d.jpeg)

直到我看了一篇文章👇:

[为什么 setTimeout 有最小时延 4ms?](https://mp.weixin.qq.com/s?__biz=MzAxODE2MjM1MA==&mid=2651578171&idx=1&sn=404e2a1803909ab328194068d4792337&chksm=802508fab75281ece593391d7a1dc07597324273016460c68c384e69d80772b044fb07840ef8&scene=132#wechat_redirect)

当时我就:

![img](./b.jpeg)

于是我不信,写了一个demo测试

``` javaScript
    setTimeout(() => console.log(5), 5);
    setTimeout(() => console.log(4), 4);
    setTimeout(() => console.log(3), 3);
    setTimeout(() => console.log(2), 2);
    setTimeout(() => console.log(1), 1);
    setTimeout(() => console.log(0), 0);
````

于是:

![img](./e.png)

啊这...

![img](./b.jpeg)

然后按照文章里讲的:

``` javaScript
    setTimeout(() => console.log(5), 5);
    setTimeout(() => console.log(4), 4);
    setTimeout(() => console.log(3), 3);
    setTimeout(() => console.log(2), 2);
    setTimeout(() => console.log(1), 1);
    setTimeout(() => console.log(0), 0);
```

👇:

![img](./f.png)

...

![img](./d.jpeg)


## 为什么要有这样的区别

一个词:  **tradeoff(平衡)**

![img](./g.jpg)
