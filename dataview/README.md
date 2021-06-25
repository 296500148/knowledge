# DataView以及注意大小端序

## 什么是DataView

参考[mdn上的解释](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/DataView)

>DataView 视图是一个可以从二进制ArrayBuffer对象中读写多种数值类型的底层接口，使用它时，不用考虑不同平台的字节序问题

## DataView有什么用

前面我曾经写过一篇文章介绍过buffer、ArrayBuffer、File以及Blob，感兴趣的可以点下面👇:

[Arraybuffer、Blob、File、Buffer详解、作用以及相互转化](https://zhuanlan.zhihu.com/p/376721544)

在前端领域(浏览器环境里)是没有Buffer的,然而ArrayBuffer、File以及Blob又是不可写的。如果想要对一段二进制数据进行写操作，就得依靠本文的主角DataView(当然,使用TypedArray也是可以的)

敲黑板🥸:DataView可以从二进制ArrayBuffer对象中读写多种数值类型的底层接口，使用它时，不用考虑不同平台的字节序问题

## 使用方法

*如果你熟悉TypedArray的话可能很容易看懂,也能猜到我没有写出来的api是哪些*

``` javaScript
  const dataview = new DataView(buffer [, byteOffset [, byteLength]]);
  //buffer指一个 已经存在的ArrayBuffer 或 SharedArrayBuffer 对象，DataView 对象的数据源
  //byteOffset和byteLength很少用到
  //byteOffset指dataview写的字符相对于buffer的位置
  //byteLength指dataView的要操作的长度

  //读操作
  dataview.getInt8(byteOffset);//还有getUnit8，getInt16...对应TypedArray集合里的类型
  //写操作
  dataview.setInt8(byteOffset, value);//还有setUint8，setInt16...对应TypedArray集合里的类型

  //注意如果是大于一个字节的写操作还会有第三个参数,用来控制写顺序
  dataview.setInt16(byteOffset, value,[, littleEndian])

```

**其中第三个参数是很重要的,如果你使用过nodejs里的Buffer的话,在这里会有点不一样。当然，参数顺序也不一样**

## 大小端序问题

关于什么是大小端序在这里就不做说明了,在这里给个链接👇:
[大小端模式](https://baike.baidu.com/item/%E5%A4%A7%E5%B0%8F%E7%AB%AF%E6%A8%A1%E5%BC%8F/6750542?fr=aladdin)

我只简短说一下:(仅供理解,和实际会有出入,不过大概意思是一样的)
>数字1的二进制(假设只占一个字节)是00000001，这是大端序的表示
>如果用小端序表述就是10000000

## 举个🌰

给大家介绍一下前端生成wav文件头的代码(仅做示范)

*dataLength和numChannels以及sampleRate有关看使用场景,所以下面的代码直接用是很危险的,*

``` javaScript
  function writeString(view, offset, string){
    for (var i = 0; i < string.length; i++){
      view.setUint8(offset + i, string.charCodeAt(i));
    }
  }
  function genWAVHead(dataLength){
    var buffer = new ArrayBuffer(44 );
    var view = new DataView(buffer);

    /* RIFF identifier */
    writeString(view, 0, 'RIFF');
    /* RIFF chunk length */
    view.setUint32(4, 36 + dataLength, true);
    /* RIFF type */
    writeString(view, 8, 'WAVE');
    /* format chunk identifier */
    writeString(view, 12, 'fmt ');
    /* format chunk length */
    view.setUint32(16, 16, true);
    /* sample format (raw) */
    view.setUint16(20, 1, true);
    /* channel count */
    view.setUint16(22, numChannels, true);
    /* sample rate */
    view.setUint32(24, sampleRate, true);
    /* byte rate (sample rate * block align) */
    view.setUint32(28, sampleRate * 4, true);
    /* block align (channel count * bytes per sample) */
    view.setUint16(32, numChannels * 2, true);
    /* bits per sample */
    view.setUint16(34, 16, true);
    /* data chunk identifier */
    writeString(view, 36, 'data');
    /* data chunk length */
    view.setUint32(40, dataLength, true);

    return view;
  }
```
