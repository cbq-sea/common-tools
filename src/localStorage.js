/**
 * 本地缓存方法封装了window.localStorage
 */
export default class Storage {
  /**
   * 封装了window.localStorage.setItem，增加了一个特性：被赋值的值可以使jsonObject类型
   * @param {string} key 键名
   * @param {any} value 值，可以是json object类型
   */
  static kset(key, value) {
    if (typeof value === 'object') value = JSON.stringify(value);
    window.localStorage.setItem(key, value);
  }

  /**
   * 封装了window.localStorage.getItem,增加一个特性：根据key可以直接获取到jsonObject类型的value值
   * @param {string} key 键名
   */
  static kget(key) {
    let value = window.localStorage.getItem(key);
    try {
      value = JSON.parse(value);
    } catch (e) {}
    return value;
  }

  /**
   * 封装了window.localStorage.removeItem
   * @param {string} key 键名
   */
  static kremove(key) {
    window.localStorage.removeItem(key);
  }

  /**
   * 封装了window.localStorage.kclear
   */
  static kclear() {
    window.localStorage.clear();
  }
}
