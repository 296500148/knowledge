/**
 * @param {string} s
 * @return {string}
 */
function longestPalindrome(s) {
  if (s.length < 2) return s;
  let maxLength = 1;
  let index = 0;
  //Manacher算法,利用回文对称的性质，根据i在上一个回文中心的臂长里的位置去判断i的回文性
  //所以这里就需要知道上一个回文中心，以及其臂长
  let center = 0;
  //注意这里使用了maxRight的而不是真实的臂长length,因为到时候需要判断i在臂长的什么位置
  //如果这里臂长用了length,到时候还要 计算i - center 去和 length比较，太繁琐
  let maxRight = 0;
  //因为考虑到回文串的长度是偶数的情况,所以这里预处理一下字符串,每个字符间插入特殊字符,把可能性都化为奇数
  //这个处理把回文串长度的可能性都化为了奇数(一句话 nubility)
  //#c#b#b#a#
  //#c#b#a#b#d#
  let ss = "";
  for(let i =0;i<s.length;i++){
    ss += "#"+s[i];
  }
  ss += "#";
  //需要维护一个每个位置臂长的信息数组positionLength
  const pl = new Array(ss.length).fill(0);
  //这里需要注意参考的是i关于center对称的点i'的回文性
  //i' = 2*center - i;
  //所以列下情况:
  //1.i>maxRight,找不到i',无法参考，自己算自己的
  //2.i<=maxRight:
  //2.1 i<maxRight-pl[i'],pl[i']的臂长没有超过center的臂长,根据对称性,pl[i] = pl[i']
  //2.2 i=maxRight-pl[i'],pl[i']的臂长刚好等于center的臂长,根据对称性,pl[i] >= pl[i‘],大多少需要尝试扩散
  //2.3 i>maxRight-pl[i'],pl[i']的臂长超过了center的臂长,根据对称性,i中心扩散到MaxRight处,s[2*i-maxRight] !== s[MaxRight]必不想等，所以pl[i] = maxRight-i;
  //总结就是pl[i] = Math.min(maxRight-i,pl[i']);提示i<maxRight-pl[i'] 也可写成 pl[i']<maxRight-i
  //0没有意义,从1开始计算
  for(let i=1;i<ss.length;i++){
    if(i<=maxRight){//可以参考之前的
      pl[i] = Math.min(maxRight-i,pl[2*center-i]);
      // //尝试中心扩散
      // center = i;
      // maxRight = pl[i]+1;
      // while(ss[maxRight]===s[2*center - maxLength]){
      //   maxRight++;
      //   pl[i]++;
      // }
    }
    //注意到i<maxRight时都要尝试中心扩散,所以写else完全无意义,把中心扩散的代码般下来就好
    // else{//i不在之前回文中心的臂长范围里,之前的信息就完全无法参考,只能从i中心扩散把，然后去维护maxRight和center的定义
      //尝试中心扩散
      //这里不要动center和maxRight
      // center = i;
      // maxRight = pl[i] + i + 1;
      let right = pl[i] + i + 1;
      let left = i - pl[i] - 1;
      while (left>=0&&right<ss.length&&ss[left] === ss[right]) {
          right++;
          left--;
          pl[i]++;
        }
    // }
    if(pl[i]+i>maxRight){
      center = i;
      maxRight = pl[i] + i;
    }
    if (pl[i] * 2 + 1>maxLength){
      maxLength = pl[i]*2+1;
      index = i - pl[i];
    }
  }
  return ss.substr(index, maxLength).replace(/#/g,"");
}

const test = [
  "babad",
  "cbbd",
  "a",
  "ac",
  "aa",
  "aacabdkacaa",
  "aaaa"
]
test.forEach(t => console.log(longestPalindrome(t)))