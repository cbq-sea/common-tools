var IDX = 36,
    HEX = '';

while (IDX--) {
  HEX += IDX.toString(36);
}

export function uid(len) {
  var str = '',
      num = len || 11;

  while (num--) {
    str += HEX[Math.random() * 36 | 0];
  }

  return str;
}
export var createKey = function createKey() {
  return Math.random().toString(36).substr(2);
};