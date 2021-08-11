function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

/**
 * 本地缓存方法封装了window.localStorage
 */
var Storage = /*#__PURE__*/function () {
  function Storage() {
    _classCallCheck(this, Storage);
  }

  _createClass(Storage, null, [{
    key: "kset",

    /**
     * 封装了window.localStorage.setItem，增加了一个特性：被赋值的值可以使jsonObject类型
     * @param {string} key 键名
     * @param {any} value 值，可以是json object类型
     */
    value: function kset(key, value) {
      if (_typeof(value) == 'object') value = JSON.stringify(value);
      window.localStorage.setItem(key, value);
    }
    /**
     * 封装了window.localStorage.getItem,增加一个特性：根据key可以直接获取到jsonObject类型的value值
     * @param {string} key 键名
     */

  }, {
    key: "kget",
    value: function kget(key) {
      var value = window.localStorage.getItem(key);

      try {
        value = JSON.parse(value);
      } catch (e) {}

      return value;
    }
    /**
     * 封装了window.localStorage.removeItem
     * @param {string} key 键名
     */

  }, {
    key: "kremove",
    value: function kremove(key) {
      window.localStorage.removeItem(key);
    }
    /**
     * 封装了window.localStorage.kclear
     */

  }, {
    key: "kclear",
    value: function kclear() {
      window.localStorage.clear();
    }
  }]);

  return Storage;
}();

export { Storage as default };