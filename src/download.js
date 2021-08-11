import qs from 'querystring'

/**
 * get  请求下载文件
 * @param {string} url
 * @param {object} params
 * @param {string} fileName
 */
function downloadFileByGet(url, param = {}, fileName, toast) {
  return new Promise((resolve, reject) => {
    const urlTarget = `${url}?${qs.stringify({ ...param, _: Date.now() })}`
    const xhr = new XMLHttpRequest()
    xhr.open('GET', urlTarget) //

    xhr.responseType = 'blob' // 返回类型blob
    // 定义请求完成的处理函数
    xhr.onload = function (e) {
      const res = this.response
      if (this.status === 200 && res.type !== 'application/json') {
        fileName = fileName || decodeURIComponent(this.getResponseHeader('filename'))

        if (window.navigator.msSaveBlob) {
          // 兼容ie
          window.navigator.msSaveBlob(res, fileName)
        } else {
          let elink = document.createElement('a')
          elink.download = fileName
          elink.style.display = 'none'
          elink.href = URL.createObjectURL(res)

          document.body.appendChild(elink)
          elink.click()
          URL.revokeObjectURL(elink.href) // 释放URL 对象
          document.body.removeChild(elink)
          elink = null
        }
        resolve(e)
      } else {
        const reader = new FileReader()
        reader.onload = function (e) {
          const result = JSON.parse(e.target.result)
          typeof toast !== 'undefined'
            ? toast(result.msg || result.error)
            : alert(result.msg || result.error)

          reject(result)
        }
        reader.onerror = function (e) {
          reject(e)
        }
        reader.readAsText(res)
      }
    }
    xhr.onerror = function (e) {
      reject(e)
    }
    xhr.send()
  })
}

/**
 * post  请求下载文件
 * @param {string} url
 * @param {object} params
 * @param {string} fileName
 *  @param {string} type
 */
function downloadFileByPost(url, params, fileName, type = '1', toast) {
  return new Promise((resolve, reject) => {
    const xhr = new XMLHttpRequest()
    xhr.open('POST', url) //
    xhr.responseType = 'blob' // 返回类型blob

    if (type === '1') {
      xhr.setRequestHeader('Content-Type', 'application/json')
    } else {
      xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded')
    }
    // 定义请求完成的处理函数
    xhr.onload = function (e) {
      const res = this.response

      if (this.status === 200 && res.type !== 'application/json') {
        fileName = fileName || decodeURIComponent(this.getResponseHeader('filename'))

        // this.getResponseHeader('content-disposition')
        if (window.navigator.msSaveBlob) {
          // 兼容ie
          window.navigator.msSaveBlob(res, fileName)
        } else {
          let elink = document.createElement('a')
          elink.download = fileName
          elink.style.display = 'none'
          elink.href = URL.createObjectURL(res)

          document.body.appendChild(elink)
          elink.click()
          URL.revokeObjectURL(elink.href) // 释放URL 对象
          document.body.removeChild(elink)
          elink = null
        }
        resolve(e)
      } else {
        const reader = new FileReader()
        reader.onload = function (e) {
          const result = JSON.parse(e.target.result)
          typeof toast !== 'undefined'
            ? toast(result.msg || result.error)
            : alert(result.msg || result.error)
          reject(result)
        }
        reader.onerror = function (e) {
          reject(e)
        }
        reader.readAsText(res)
      }
    }
    xhr.onerror = function (e) {
      reject(e)
    }
    if (type === '1') {
      // 以json格式参数发送ajax请求
      xhr.send(JSON.stringify(params))
    } else {
      xhr.send(qs.stringify(params))
    }
  })
}

/**
 * 下载blob文件
 * @param {string} fileName 文件
 */
function downloadBlob(fileName) {
  if (window.navigator.msSaveBlob) {
    // 兼容ie
    window.navigator.msSaveBlob(res, fileName)
  } else {
    let elink = document.createElement('a')
    elink.download = fileName
    elink.style.display = 'none'
    elink.href = URL.createObjectURL(res)

    document.body.appendChild(elink)
    elink.click()
    URL.revokeObjectURL(elink.href) // 释放URL 对象
    document.body.removeChild(elink)
    elink = null
  }
}

export { downloadFileByGet, downloadFileByPost, downloadBlob }
