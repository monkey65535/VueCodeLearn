import {observer} from './index'
import {arrayMethods, observerArray} from "./array";

// 定义响应式的数据变化
export function defineReactive(data, key, value) {
    // 如果value还是一个对象,那么需要深度观察
    observer(value)// 递归观察
    // ES5方法 Vue不支持IE9一下浏览器的原因
    Object.defineProperty(data, key, {
        get() {
            return value
        },
        set(newValue) {
            if (newValue === value) return
            observer(newValue)      // 如果是新增的对象的话,也需要进行一次监听
            value = newValue
        }
    })
}

class Observer {
    // data是前面定义的vm._data
    constructor(data) {
        console.log(data, 'Observe_data')
        // Object.definedProperty无法对数组进行操作,所以数组需要单独处理,需要重写push等方法
        if (Array.isArray(data)) {
            data.__proto__ = arrayMethods
            // 如果是数组的话,需要继续观察数组中的每一项
            observerArray(data)
        } else {
            this.walk(data)
        }
    }

    walk(data) {
        let keys = Object.keys(data)
        for (let i = 0; i < keys.length; i++) {
            let key = keys[i]
            let value = data[key]
            defineReactive(data, key, value)
        }
    }


}

export default Observer
