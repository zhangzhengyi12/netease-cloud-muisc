const throttle = function(func: any, wait: number, options?: any) {
  var context: any, args: any, result: any
  var timeout: any = null
  var previous = 0
  if (!options) options = {}
  var later = function() {
    previous = options.leading === false ? 0 : Date.now()
    timeout = null
    result = func.apply(context, args)
    if (!timeout) context = args = null
  }
  return function(this: any) {
    var now = Date.now()
    if (!previous && options.leading === false) previous = now //如果需要首次直接调用
    var remaining = wait - (now - previous) // 获取距离延迟目标的时间 <0 则达到目标
    context = this
    args = arguments
    if (remaining <= 0 || remaining > wait) {
      if (timeout) {
        clearTimeout(timeout)
        timeout = null
      }
      previous = now // 重新设置这次调用的事件，为下一次计算延迟做准备
      result = func.apply(context, args)
      if (!timeout) context = args = null
    } else if (!timeout && options.trailing !== false) {
      // 禁止最后一次自动调用
      timeout = setTimeout(later, remaining)
    }
    return result
  }
}

export function shuffle(arr: Array<any>): Array<any> {
  arr = arr.slice()
  for (let i = 0; i < arr.length; i++) {
    let j = getRandomInt(0, i)
    let t = arr[i]
    arr[i] = arr[j]
    arr[j] = t
  }
  return arr
}

function getRandomInt(min: number, max: number): number {
  return Math.floor(Math.random() * (max - min + 1) + min)
}

// find index

export const findIndexOf = (arr: Array<any>, v: any) => arr.findIndex(i => i === v)

export default throttle

export const debounce = function(func: any, wait: any, immediate: any) {
  let timeout: any, args: any, context: any, timestamp: any, result: any

  let later = function() {
    let last = Date.now() - timestamp // 获取现在与上一次防抖函数的运行间隔时间

    if (last < wait && last >= 0) {
      // 间隔太小，频率过多，继续延迟
      timeout = setTimeout(later, wait - last) // wait - last为接下来不触发防抖的期望时间
    } else {
      timeout = null // 间隔够长，运行函数
      if (!immediate) {
        result = func.apply(context, args)
        if (!timeout) context = args = null
      }
    }
  }

  return function(this: any, ..._args: any[]) {
    context = this
    args = _args
    timestamp = Date.now() //刷新最新一次调用该防抖函数的时间戳
    let callNow = immediate && !timeout // 是否需要立即调用一次，
    if (!timeout) timeout = setTimeout(later, wait) // 同一时间内只存在一个超时
    if (callNow) {
      // 立即调用一次
      result = func.apply(context, args)
      context = args = null
    }
    // 短时间内触发多次不会调用原函数
    return result
  }
}
