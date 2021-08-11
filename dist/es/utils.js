var _this = this;

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

export var hasChanged = function hasChanged(value, oldValue) {
  return value !== oldValue && (value === value || oldValue === oldValue);
};
export var debounce = function debounce(func) {
  var wait = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 200;
  var immediate = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : false;
  var timeout;
  return function () {
    var context = _this;

    var later = function later() {
      timeout = null;

      if (!immediate) {
        for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
          args[_key] = arguments[_key];
        }

        func.apply(context, args);
      }
    };

    var callNow = immediate && !timeout;
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);

    if (callNow) {
      func.apply(context, args);
    }
  };
};
export function throttle(fn, wait) {
  var timer = null;
  return function () {
    var _this2 = this;

    for (var _len2 = arguments.length, args = new Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
      args[_key2] = arguments[_key2];
    }

    if (!timer) {
      timer = setTimeout(function () {
        timer = null;
        fn.call(_this2, args);
      }, wait);
    }
  };
} // export const debounce = (fn, delay = 100) => {
//   let timer = null
//   return function(...args) {
//     clearTimeout(timer)
//     timer = setTimeout(() => {
//       fn.apply(this, args)
//     }, delay)
//   }
// }

function typeOf(obj) {
  var toString = Object.prototype.toString;
  var map = {
    '[object Boolean]': 'boolean',
    '[object Number]': 'number',
    '[object String]': 'string',
    '[object Function]': 'function',
    '[object Array]': 'array',
    '[object Date]': 'date',
    '[object RegExp]': 'regExp',
    '[object Undefined]': 'undefined',
    '[object Null]': 'null',
    '[object Object]': 'object'
  };
  return map[toString.call(obj)];
}

function deepCopy(data) {
  var t = typeOf(data);
  var o;

  if (t === 'array') {
    o = [];
  } else if (t === 'object') {
    o = {};
  } else {
    return data;
  }

  if (t === 'array') {
    for (var i = 0; i < data.length; i++) {
      o.push(deepCopy(data[i]));
    }
  } else if (t === 'object') {
    // eslint-disable-next-line no-restricted-syntax
    for (var _i in data) {
      if (Object.prototype.hasOwnProperty.call(data, _i)) {
        o[_i] = deepCopy(data[_i]);
      }
    }
  }

  return o;
}

export { deepCopy };
export function buildTree() {
  var treeData = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];
  var temp = {};
  var tree = {}; // 数组转 键值对

  treeData.forEach(function (item) {
    temp[item.id] = _objectSpread({}, item);
  });
  var tempKeys = Object.keys(temp);
  tempKeys.forEach(function (key) {
    // 获取当前项
    var item = temp[key]; // 当前项 pId

    var parentId = item.parentId; // 获取父级项

    var parentItemByPid = temp[parentId];

    if (parentItemByPid) {
      if (!parentItemByPid.children) {
        parentItemByPid.children = [];
      }

      parentItemByPid.children.push(item);
    } else {
      tree[item.id] = item;
    }
  }); // 对象转数组并返回

  return Object.keys(tree).map(function (key) {
    return tree[key];
  });
}
export function omit(obj, fields) {
  var shallowCopy = _objectSpread({}, obj);

  for (var i = 0; i < fields.length; i++) {
    var key = fields[i];
    delete shallowCopy[key];
  }

  return shallowCopy;
}
export var pick = function pick(obj, keys) {
  var r = {};
  keys.forEach(function (key) {
    r[key] = obj[key];
  });
  return r;
}; // // watch DOM change
// export const MutationObserver = isServer
//   ? false
//   : window.MutationObserver || window.WebKitMutationObserver || window.MozMutationObserver || false

var SPECIAL_CHARS_REGEXP = /([\:\-\_])+(.)/g; // 转化为小驼峰

export function camelCase(name) {
  return name.replace(SPECIAL_CHARS_REGEXP, function (_, separator, letter, offset) {
    return offset ? letter.toUpperCase() : letter;
  });
}
export function firstUpperCase(str) {
  return str.toString()[0].toUpperCase() + str.toString().slice(1);
}
/**
 * 数组分割
 * @param {array} arr
 * @param {number} size
 */

export function chunk(arr) {
  var size = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 1;
  var result = [];
  var s = Math.ceil(arr.length / size);

  for (var i = 0; i < s; i++) {
    result[i] = arr.slice(size * i, size * (i + 1));
  }

  return result;
}