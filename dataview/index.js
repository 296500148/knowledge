var arrayBuffer = new ArrayBuffer(8);
var dataview = new DataView(arrayBuffer);
function logArrayBuffer(info){
  console.log(info+new Int8Array(arrayBuffer));
}
dataview.setInt8(0,1);
logArrayBuffer("setInt8(0,1) : ");
console.log("=======");
console.log("Int8只占一位,超出无效");
dataview.setInt8(0, 256);
logArrayBuffer("setInt8(0,256)溢出取溢出大小: ");
dataview.setInt8(0, 258);
logArrayBuffer("setInt8(0,258)溢出取溢出大小: ");
console.log("=======");
console.log("大小端序问题");
dataview.setInt16(0,258);
logArrayBuffer("setInt16(0,258) : ");
dataview.setInt16(0, 258,true);
logArrayBuffer("setInt16(0,258,true)小端序 : ");
