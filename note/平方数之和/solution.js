/**
 * @param {number} c
 * @return {boolean}
 */
var judgeSquareSum = function (c) {
  if (!c) return true;
  let max = Math.ceil(Math.sqrt(c));
  for (let i = 0; i < max; i++) {
    const d = Math.sqrt(c - i * i);
    //关键就是下面这句话
    if (d === Math.floor(d)) return true;
  }
  return false;
};