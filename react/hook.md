# react引入hook的动机

## 遇到的问题

1. 高阶组件和renderProps的使用使组件嵌套过深,难以追踪数据流

2. 类组件的逻辑穿插在各种生命周期，如订阅和取消订阅或设置定时器和取消定时器等等...不相关的逻辑会在一个生命周期里,相关的逻辑却被分割在不同的生命周期中

3. 类比较复杂(特别是this的处理);需要把函数组件转为类时需要大量的样板代码；即使一个类的方法没有被使用编译执行时也很难被删除(因为很难知道方法不会被调用);难以实现热重栽;

## 存在的解决方案

mixin可以解决一些问题(逻辑复用和嵌套地狱)

``` javaScript
    var SetIntervalMixin = {
  componentWillMount: function() {
    this.intervals = [];
  },
  setInterval: function() {
    this.intervals.push(setInterval.apply(null, arguments));
  },
  componentWillUnmount: function() {
    this.intervals.forEach(clearInterval);
  }
};

var createReactClass = require('create-react-class');

var TickTock = createReactClass({
  mixins: [SetIntervalMixin], // 使用 mixin
  getInitialState: function() {
    return {seconds: 0};
  },
  componentDidMount: function() {
    this.setInterval(this.tick, 1000); // 调用 mixin 上的方法
  },
  tick: function() {
    this.setState({seconds: this.state.seconds + 1});
  },
  render: function() {
    return (
      <p>
        React has been running for {this.state.seconds} seconds.
      </p>
    );
  }
});

ReactDOM.render(
  <TickTock />,
  document.getElementById('example')
);
```

## 为什么没有采用mixin的方案:

* 引入了隐式依赖

在一个类中你会使用类中未定义的方法,查找比较困难,特别是当mixin比较多的时候

* 名称冲突

不能保证两个特定的 mixin 可以一起使用,即使你能控制，但是如果多个mixin怎么办

* 导致滚雪球般的复杂性

需求的变动可能导致mixin增多，逻辑和内在联系变得越来越复杂(写一个新的mixin你可能会依赖于已经存在的mixin,即隐式依赖)后期会导致组件变得难以维护和扩展

就像你看到的,上述三个问题解决以一个问题可能会导致其余问题变得更复杂

# hook如何解决

* 自定义hook,逻辑复用(Hook 使你在无需修改组件结构的情况下复用状态逻辑)

* Hook 将组件中相互关联的部分拆分成更小的函数（比如设置订阅或请求数据）

* Hook 使你在非 class 的情况下可以使用更多的 React 特性

***

参考链接:https://zh-hans.reactjs.org/docs/hooks-intro.html