/**
 * @param {string} s
 * @return {number}
 */
var myAtoi = function (s) {
  s = s.trim();
  let index = 0;
  let flag = true;
  switch (s[0]) {
    case "-": {
      flag = false;
      index++;
    } break;
    case "+": {
      index++;
    }
  }
  let r = 0;
  while (index < s.length) {
    const codeValue = s.charCodeAt(index);
    if (codeValue > 47 && codeValue < 58) {
      r = r * 10 + s[index] / 1;
      index++;
    } else {
      if (r) {
        break;
      } else {
        return 0;
      }
    }
  }
  let c = false;
  if (r > 2147483647) {
    c = true;
    r = 2147483647;
  }
  return flag ? r : c ? -2147483648 : -r;
};

/**
 * 状态机
 * class Solution {
    public int myAtoi(String str) {
        Automaton automaton = new Automaton();
        int length = str.length();
        for (int i = 0; i < length; ++i) {
            automaton.get(str.charAt(i));
        }
        return (int) (automaton.sign * automaton.ans);
    }
}

class Automaton {
    public int sign = 1;
    public long ans = 0;
    private String state = "start";
    private Map<String, String[]> table = new HashMap<String, String[]>() {{
        put("start", new String[]{"start", "signed", "in_number", "end"});
        put("signed", new String[]{"end", "end", "in_number", "end"});
        put("in_number", new String[]{"end", "end", "in_number", "end"});
        put("end", new String[]{"end", "end", "end", "end"});
    }};

    public void get(char c) {
        state = table.get(state)[get_col(c)];
        if ("in_number".equals(state)) {
            ans = ans * 10 + c - '0';
            ans = sign == 1 ? Math.min(ans, (long) Integer.MAX_VALUE) : Math.min(ans, -(long) Integer.MIN_VALUE);
        } else if ("signed".equals(state)) {
            sign = c == '+' ? 1 : -1;
        }
    }

    private int get_col(char c) {
        if (c == ' ') {
            return 0;
        }
        if (c == '+' || c == '-') {
            return 1;
        }
        if (Character.isDigit(c)) {
            return 2;
        }
        return 3;
    }
}

 */