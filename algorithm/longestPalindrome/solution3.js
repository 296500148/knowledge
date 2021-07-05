/**
 * @param {string} s
 * @return {string}
 */
function longestPalindrome(s) {
  if (s.length < 2) return s;
  const len = s.length;
  let maxLength = 1;
  let index = 0;
  //动态规划,利用的是回文串的性质：如果s[i] === s[j],那么当s[i+1:j-1]是回文串的时候,s[i:j]也是回文串
  //s[i] === s[j]时,j-i<3必是回文串
  const dp = new Array(len).fill(0).map(_=>new Array(len).fill(false));
  for(let i=0;i<len;i++){//初始化，单个字符必是回文串
    dp[i][i] = true;
  }
  //因为s[i:j]的判断可能取决于s[i+1:j-1],在dp里表示就是dp[i][j]=>dp[i+1][j-1],注意dp[i+1][j-1]是在dp[i][j]的左下角的
  //所以这里应该先行遍历，再列遍历(也就是一列填满了再填下一列，而不是一行填满了再填下一行)
  for(let j=1;j<len;j++){
    //注意到字符串中j应该是在i右边的，即j>=i,所以判断条件到i<j就行,(i==j)已经被初始化了
    for(let i=0;i<j;i++){
      if(s[i]!==s[j]){
        dp[i][j] = false;
      }else{
        if(j-i<3){
          dp[i][j] = true;
        }else{
          dp[i][j] = dp[i+1][j-1];
        }
      }
      if(dp[i][j] && j-i+1>maxLength){
        maxLength = j - i + 1;
        index = i;
      }
    }
  }

  return s.substr(index, maxLength);
}

let s = "";
for (let i = 0; i < 100; i++) {
  s += "a";
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