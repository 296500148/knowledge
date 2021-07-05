/**
 * @param {string} s
 * @return {string}
 */
function longestPalindrome(s) {
  if (s.length < 2) return s;
  let maxLength = 1;
  let index = 0;
  //中心扩散法，枚举所有可能的回文中心，然后从中心向外扩散，计算最远的长度
  for(let i = 0;i<s.length;i++){
    const len1 = palindromeLength(s, i, i);
    //这里需要考虑回文串长度为偶数的情况，可能会容易忽略
    const len2 = palindromeLength(s, i, i+1);
    const len = Math.max(len1,len2);
    if(len>maxLength){
      maxLength = len;
      index = Math.floor(i - maxLength/2) + 1
    }
  }
  return s.substr(index, maxLength);
}

function palindromeLength(str, left, right) {
    //这里需要注意left>=0，即left=0的时候还是要继续扩散一次
    //不需要担心减负值是因为最后计算的是距离,就是left是负的也不影响
    while(left>=0&&right<str.length&&str[left]===str[right]){
      left--;
      right++;
    }
    return right - left - 1;
}

let s = "";
for(let i =0;i<100;i++){
  s+="a";
}
console.time("start");
longestPalindrome(s);
console.timeEnd("start");

// const test = [
//   "babad",
//   "cbbd",
//   "a",
//   "ac",
//   "aa",
// ]

// test.forEach(t => console.log(longestPalindrome(t)))