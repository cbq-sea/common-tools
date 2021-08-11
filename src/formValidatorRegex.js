const formatReg = {
  chineseReg: /[\u4e00-\u9fa5]/gm,
  numberReg: /^\d+$/,
  mobileReg: /^1[0-9]{10}$/, // 手机号码 /^1([358][0-9]|4[579]|66|7[0135678]|9[89])[0-9]{8}$/
  emailReg: /\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*/, // email
  postcodeReg: /^[1-9]\d{5}(?!\d)$/, // 邮政编码
  phoneReg: /((^1[0-9]{10}$)|^((\d{7,8})|(\d{4}|\d{3})-?(\d{7,8})|(\d{4}|\d{3})-?(\d{7,8})-(\d{4}|\d{3}|\d{2}|\d{1})|(\d{7,8})-(\d{4}|\d{3}|\d{2}|\d{1}))$)/, // 支持手机和座机
};

/**
 * 格式化千分位
 * @param num
 * @returns {string}
 */
const formatNumber = (num) => {
  const bool = Number.isInteger(num);
  const reg = /\d{1,3}(?=(\d{3})+$)/g;
  if (bool) {
    return `${num}`.replace(reg, '$&,');
  }
  const temp = `${num}`.split('.');
  return `${temp[0].replace(reg, '$&,')}.${temp[1]}`;
};
/**
 * 手机号脱敏
 * @param phone xxx **** xxxx
 * @returns {string}
 */
const formatPhoneDesensitization = (phone) => {
  const reg = /(\d{3})\d{4}(\d{4})/;
  return `${phone}`.replace(reg, '$1****$2');
};

/**
 * 手机号间隔 xxx xxxx xxxx
 * @param phone
 * @returns {string}
 */
const formatPhoneSpace = (phone) => {
  const reg = /(^\d{3}|\d{4}\B)/g;
  return `${phone}`.replace(reg, '$1 ');
};

export {
  formatReg, formatNumber, formatPhoneDesensitization, formatPhoneSpace
};
