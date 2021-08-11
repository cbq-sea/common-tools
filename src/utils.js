export const hasChanged = (value, oldValue) => value !== oldValue && (value === value || oldValue === oldValue);

export const debounce = (func, wait = 200, immediate = false) => {
  let timeout;
  return () => {
    const context = this;

    const later = (...args) => {
      timeout = null;

      if (!immediate) {
        func.apply(context, args);
      }
    };
    const callNow = immediate && !timeout;

    clearTimeout(timeout);

    timeout = setTimeout(later, wait);

    if (callNow) {
      func.apply(context, args);
    }
  };
};

export function throttle(fn, wait) {
  let timer = null;

  return function (...args) {
    if (!timer) {
      timer = setTimeout(() => {
        timer = null;
        fn.apply(this, args);
      }, wait)
    }
  };
}

// export const debounce = (fn, delay = 100) => {
//   let timer = null

//   return function(...args) {
//     clearTimeout(timer)

//     timer = setTimeout(() => {
//       fn.apply(this, args)
//     }, delay)
//   }
// }

function typeOf(obj) {
  const { toString } = Object.prototype;
  const map = {
    '[object Boolean]': 'boolean',
    '[object Number]': 'number',
    '[object String]': 'string',
    '[object Function]': 'function',
    '[object Array]': 'array',
    '[object Date]': 'date',
    '[object RegExp]': 'regExp',
    '[object Undefined]': 'undefined',
    '[object Null]': 'null',
    '[object Object]': 'object',
  };
  return map[toString.call(obj)];
}

function deepCopy(data) {
  const t = typeOf(data);
  let o;

  if (t === 'array') {
    o = [];
  } else if (t === 'object') {
    o = {};
  } else {
    return data;
  }

  if (t === 'array') {
    for (let i = 0; i < data.length; i++) {
      o.push(deepCopy(data[i]));
    }
  } else if (t === 'object') {
    // eslint-disable-next-line no-restricted-syntax
    for (const i in data) {
      if (Object.prototype.hasOwnProperty.call(data, i)) {
        o[i] = deepCopy(data[i]);
      }
    }
  }
  return o;
}

export { deepCopy };

export function buildTree(treeData = []) {
  const temp = {};
  const tree = {};
  // 数组转 键值对
  treeData.forEach((item) => {
    temp[item.id] = { ...item };
  });

  const tempKeys = Object.keys(temp);

  tempKeys.forEach((key) => {
    // 获取当前项
    const item = temp[key];
    // 当前项 pId
    const { parentId } = item;
    // 获取父级项
    const parentItemByPid = temp[parentId];
    if (parentItemByPid) {
      if (!parentItemByPid.children) {
        parentItemByPid.children = [];
      }
      parentItemByPid.children.push(item);
    } else {
      tree[item.id] = item;
    }
  });

  // 对象转数组并返回
  return Object.keys(tree).map((key) => tree[key]);
}

export function omit(obj, fields) {
  const shallowCopy = {
    ...obj,
  };
  for (let i = 0; i < fields.length; i++) {
    const key = fields[i];
    delete shallowCopy[key];
  }
  return shallowCopy;
}

export const pick = (obj, keys) => {
  const r = {};
  keys.forEach((key) => {
    r[key] = obj[key];
  });
  return r;
};

// // watch DOM change
// export const MutationObserver = isServer
//   ? false
//   : window.MutationObserver || window.WebKitMutationObserver || window.MozMutationObserver || false

const SPECIAL_CHARS_REGEXP = /([\:\-\_])+(.)/g;

// 转化为小驼峰
export function camelCase(name) {
  return name.replace(SPECIAL_CHARS_REGEXP, (_, separator, letter, offset) => (offset ? letter.toUpperCase() : letter));
}

export function firstUpperCase(str) {
  return str.toString()[0].toUpperCase() + str.toString().slice(1);
}

/**
 * 数组分割
 * @param {array} arr
 * @param {number} size
 */
export function chunk(arr, size = 1) {
  const result = [];

  const s = Math.ceil(arr.length / size);

  for (let i = 0; i < s; i++) {
    result[i] = arr.slice(size * i, size * (i + 1));
  }

  return result;
}
export function useQuery(param) {
  return new URLSearchParams(window.location.search).get(param);
}
