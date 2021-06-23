/**
 * @param {number} x
 * @return {number}
 */
var reverse = function (x) {
  let flag = x > 0;
  if (!flag) x = -x;
  //也可以用/10来搞
  x = (x + "").split("").reverse().join("") / 1;
  if (x >= 2147483647) return 0;
  return flag ? x : -x;
};

/**
 * class Solution {
public:
    int reverse(int x) {
        int rev = 0;
        while (x != 0) {
            int pop = x % 10;
            x /= 10;
            if (rev > INT_MAX/10 || (rev == INT_MAX / 10 && pop > 7)) return 0;
            if (rev < INT_MIN/10 || (rev == INT_MIN / 10 && pop < -8)) return 0;
            rev = rev * 10 + pop;
        }
        return rev;
    }
};
 */