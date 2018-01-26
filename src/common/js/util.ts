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

export function shuffle(arr:Array<any>):Array<any> {
  arr = arr.slice()
  for (let i = 0; i < arr.length; i++){
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

export const findIndexOf = (arr:Array<any>,v:any) => (arr.findIndex((i)=>(i===v)))

export default throttle
