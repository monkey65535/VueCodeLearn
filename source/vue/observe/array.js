/**
 * 拦截用户调用的shift unshift pop push reserve sot slice
 * 因为这些方法会导致原数组发生变化
 * */
import {observer} from "./index";

// 先获取数组的老方法, 只改写这7个方法
let oldArrayPropertyMethods = Array.prototype
// 拷贝的一个新的对象,可以查找到老的方法
export let arrayMethods = Object.create(oldArrayPropertyMethods)

let methods = [
    'push',
    'pop',
    'shift',
    'unshift',
    'reverse',
    'sort',
    'split'
]

export function observerArray(inserted) {
    // 循环数组新增的属性
    for (let i = 0; i < inserted.length; i++) {
        observer(inserted[i])
    }
}

methods.forEach(method => {
    arrayMethods[method] = function (...args) {
        // 函数劫持
        let r = oldArrayPropertyMethods[method].apply(this, args)
        let inserted = null
        // 只对新增的元素进行操作
        switch (method) {
            case 'push':
            case 'unshift':
                inserted = args
                break
            case 'splice':
                inserted = args.splice(2)       // 获取splice新增的内容
                break
            default:
                break
        }
        if (inserted) observerArray(inserted)
        // todo
        console.log('调用了数组更新的方法')

        return r
    }
})



