/**
 * @param {number} x
 * @return {boolean}
 */
var isPalindrome = function (x) {
  if (x < 0 || x%10 === 0 && x!==0) return false;
  //考虑回文数的反转肯定等于自己
  //但要注意反转之后可能会溢出的情况
  //所以只反转一半
  let reverseNumber = 0;
  while(x>reverseNumber){
    reverseNumber = x % 10 + reverseNumber * 10;
    x = Math.floor(x / 10);
  }
  //位数是奇数 或 偶数的情况
  return x === reverseNumber || x === Math.floor(reverseNumber / 10);
};