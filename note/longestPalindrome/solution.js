/**
 * @param {string} s
 * @return {string}
 */
function longestPalindrome(s){
    if(s.length<2) return s;
    let maxLength = 1;
    let index = 0;
    //暴力解法，枚举所有可能的子字符串，然后判断是否是回文串
    for(let i=0;i<s.length;i++){
      for(let j=i;j<s.length;j++){
        if (isPalindrome(s,i,j)){
          const len = j-i+1;
          if(len>maxLength){
            maxLength = len;
            index = i;
          }
        }
      }
    }
    return s.substr(index,maxLength);
}

function isPalindrome(str,left,right){
  while(left<right&&str[left]===str[right]){
    left++;
    right--;
  }
  return left>=right;
}

const test = [
  "babad",
  "cbbd",
  "a",
  "ac"
]

test.forEach(t => console.log(longestPalindrome(t)))