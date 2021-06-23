/**
 * @param {string} s
 * @param {number} numRows
 * @return {string}
 */
var convert = function (s, numRows) {
  if (numRows < 2) return s;
  const rows = new Array(Math.min(s.length, numRows)).fill("");
  let flag = false;
  //只关注行变换,把对应字符放到对应行就行
  let cr = 0;
  for (let i = 0; i < s.length; i++) {
    rows[cr] += s[i];
    if (cr === 0 || cr === numRows - 1) flag = !flag;
    cr += flag ? 1 : -1;
  }
  let res = ''
  rows.forEach(r => res += r);
  return res;
};