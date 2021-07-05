/**
 * @param {number} c
 * @return {boolean}
 */
var judgeSquareSum = function (c) {
  //双指针法
  let b = Math.floor(Math.sqrt(c));
  let a = 0;
  while(a>b){
    let res = a * a + b * b;
    if (res===c){
      return true;
    } else if (res>c){
      b--;
    }else{
      a++;
    }
  }
  return false;
};