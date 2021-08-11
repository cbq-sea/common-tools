function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

export function isPromise(value) {
  if (value !== null && _typeof(value) === 'object') {
    return value && typeof value.then === 'function';
  }

  return false;
}
export var typeOf = function typeOf(type) {
  return function (object) {
    return Object.prototype.toString.call(object) === "[object ".concat(type, "]");
  };
};
export var isObject = function isObject(val) {
  return val !== null && _typeof(val) === 'object';
};
export var getType = function getType(obj) {
  return Object.prototype.toString.call(obj);
};

var isType = function isType(type) {
  return function (obj) {
    return obj !== null && (Array.isArray(type) ? type : [type]).some(function (t) {
      return getType(obj) === "[object ".concat(t, "]");
    });
  };
};

export var isFn = isType(['Function', 'AsyncFunction', 'GeneratorFunction']);
export var isPlainObj = isType('Object');
export var isStr = isType('String');
export var isBool = isType('Boolean');
export var isNum = isType('Number');