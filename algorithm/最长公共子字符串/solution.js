/**
 * @param {string} text1
 * @param {string} text2
 * @return {number}
 */
var longestCommonSubsequence = function (text1, text2) {
  if (!text1.length || !text2.length) return 0;
  //dp[i][j]表示text1[0:i]与text2[0:j]的最长公共子序列长度
  const dp = new Array(text1.length + 1).fill(0).map(_ => new Array(text2.length + 1).fill(0))
  let maxLength = 0;
  //边界i=0或j=0时都为0
  //状态转移方程：
  //text1[i]===text2[j]时，dp[i][j] = dp[i-1][j-1] + 1;
  //text1[i]!==text2[j]时，dp[i][j] = max(dp[i-1][j],dp[i][j-1]);
  for (let i = 0; i < text1.length; i++) {
    for (let j = 0; j < text2.length; j++) {
      if (text1[i] === text2[j]) {
        dp[i + 1][j + 1] = dp[i][j] + 1;
      } else {
        dp[i + 1][j + 1] = Math.max(dp[i][j + 1], dp[i + 1][j]);
      }
      maxLength = Math.max(dp[i + 1][j + 1], maxLength);
    }
  }
  return maxLength
};

/**
 * 最快的解法
var longestCommonSubsequence = function (text1, text2) {
  const text1Length = text1.length;
  const text2Length = text2.length;
  const dp = Array(text2Length + 1).fill(0);

  for (let i = 1; i < text1Length + 1; i++) {
    let upLeft = dp[0];
    for (let j = 1; j < text2Length + 1; j++) {
      const tmp = dp[j];
      if (text1[i - 1] === text2[j - 1]) {
        dp[j] = upLeft + 1;
      } else {
        dp[j] = Math.max(dp[j], dp[j - 1]);
      }
      upLeft = tmp;
    }
  }

  return dp[text2Length];
};
 */