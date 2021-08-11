function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

import qs from 'querystring';
/**
 * get  请求下载文件
 * @param {string} url
 * @param {object} params
 * @param {string} fileName
 */

function downloadFileByGet(url) {
  var param = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
  var fileName = arguments.length > 2 ? arguments[2] : undefined;
  var toast = arguments.length > 3 ? arguments[3] : undefined;
  return new Promise(function (resolve, reject) {
    var urlTarget = "".concat(url, "?").concat(qs.stringify(_objectSpread(_objectSpread({}, param), {}, {
      _: Date.now()
    })));
    var xhr = new XMLHttpRequest();
    xhr.open('GET', urlTarget); //

    xhr.responseType = 'blob'; // 返回类型blob
    // 定义请求完成的处理函数

    xhr.onload = function (e) {
      var res = this.response;

      if (this.status === 200 && res.type !== 'application/json') {
        fileName = fileName || decodeURIComponent(this.getResponseHeader('filename'));

        if (window.navigator.msSaveBlob) {
          // 兼容ie
          window.navigator.msSaveBlob(res, fileName);
        } else {
          var elink = document.createElement('a');
          elink.download = fileName;
          elink.style.display = 'none';
          elink.href = URL.createObjectURL(res);
          document.body.appendChild(elink);
          elink.click();
          URL.revokeObjectURL(elink.href); // 释放URL 对象

          document.body.removeChild(elink);
          elink = null;
        }

        resolve(e);
      } else {
        var reader = new FileReader();

        reader.onload = function (e) {
          var result = JSON.parse(e.target.result);
          typeof toast !== 'undefined' ? toast(result.msg || result.error) : alert(result.msg || result.error);
          reject(result);
        };

        reader.onerror = function (e) {
          reject(e);
        };

        reader.readAsText(res);
      }
    };

    xhr.onerror = function (e) {
      reject(e);
    };

    xhr.send();
  });
}
/**
 * post  请求下载文件
 * @param {string} url
 * @param {object} params
 * @param {string} fileName
 *  @param {string} type
 */


function downloadFileByPost(url, params, fileName) {
  var type = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : '1';
  var toast = arguments.length > 4 ? arguments[4] : undefined;
  return new Promise(function (resolve, reject) {
    var xhr = new XMLHttpRequest();
    xhr.open('POST', url); //

    xhr.responseType = 'blob'; // 返回类型blob

    if (type === '1') {
      xhr.setRequestHeader('Content-Type', 'application/json');
    } else {
      xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
    } // 定义请求完成的处理函数


    xhr.onload = function (e) {
      var res = this.response;

      if (this.status === 200 && res.type !== 'application/json') {
        fileName = fileName || decodeURIComponent(this.getResponseHeader('filename')); // this.getResponseHeader('content-disposition')

        if (window.navigator.msSaveBlob) {
          // 兼容ie
          window.navigator.msSaveBlob(res, fileName);
        } else {
          var elink = document.createElement('a');
          elink.download = fileName;
          elink.style.display = 'none';
          elink.href = URL.createObjectURL(res);
          document.body.appendChild(elink);
          elink.click();
          URL.revokeObjectURL(elink.href); // 释放URL 对象

          document.body.removeChild(elink);
          elink = null;
        }

        resolve(e);
      } else {
        var reader = new FileReader();

        reader.onload = function (e) {
          var result = JSON.parse(e.target.result);
          typeof toast !== 'undefined' ? toast(result.msg || result.error) : alert(result.msg || result.error);
          reject(result);
        };

        reader.onerror = function (e) {
          reject(e);
        };

        reader.readAsText(res);
      }
    };

    xhr.onerror = function (e) {
      reject(e);
    };

    if (type === '1') {
      // 以json格式参数发送ajax请求
      xhr.send(JSON.stringify(params));
    } else {
      xhr.send(qs.stringify(params));
    }
  });
}
/**
 * 下载blob文件
 * @param {string} fileName 文件
 */


function downloadBlob(fileName) {
  if (window.navigator.msSaveBlob) {
    // 兼容ie
    window.navigator.msSaveBlob(res, fileName);
  } else {
    var elink = document.createElement('a');
    elink.download = fileName;
    elink.style.display = 'none';
    elink.href = URL.createObjectURL(res);
    document.body.appendChild(elink);
    elink.click();
    URL.revokeObjectURL(elink.href); // 释放URL 对象

    document.body.removeChild(elink);
    elink = null;
  }
}

export { downloadFileByGet, downloadFileByPost, downloadBlob };