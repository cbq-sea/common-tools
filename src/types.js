export function isPromise(value) {
  if (value !== null && typeof value === 'object') {
    return value && typeof value.then === 'function'
  }

  return false
}

export const typeOf = (type) => (object) =>
  Object.prototype.toString.call(object) === `[object ${type}]`

export const isObject = (val) => val !== null && typeof val === 'object'

export const getType = (obj) => Object.prototype.toString.call(obj)

const isType = (type) => (obj) =>
  obj !== null &&
  (Array.isArray(type) ? type : [type]).some((t) => getType(obj) === `[object ${t}]`)

export const isFn = isType(['Function', 'AsyncFunction', 'GeneratorFunction'])

export const isPlainObj = isType('Object')

export const isStr = isType('String')

export const isBool = isType('Boolean')

export const isNum = isType('Number')
