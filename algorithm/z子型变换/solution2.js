/**
 * @param {string} s
 * @param {number} numRows
 * @return {string}
 */
var convert = function (s, numRows) {
  if (numRows < 2) return s;
  //模拟z字型访问
  //0行对应k*2*(numRows-1)
  //numRows-1行(尾行)对应k*2*(numRows-1) + numRows - 1；
  //其他行对应k*2*(numRows-1)+i,（k+1）*2*(numRows-1)-i；
  let res = "";
  let len = s.length;
  let space = 2 * (numRows - 1);

  for(let i=0;i<numRows;i++){
    for(let j=0;j+i<len;j+=space){
      res += s[j+i];
      if(i!=0&&i!=numRows-1&&j+space-i<len){
        res += s[j+space-i];
      }
    }
  }

  return res;
};

//关键在于z字型的分割