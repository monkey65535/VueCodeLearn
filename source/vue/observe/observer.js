import {observer} from './index'
import {arrayMethods, observerArray} from "./array";
import Dep from "./deep";

// 定义响应式的数据变化
export function defineReactive(data, key, value) {
    // 如果value还是一个对象,那么需要深度观察
    observer(value)// 递归观察
    // ES5方法 Vue不支持IE9一下浏览器的原因
    let dep = new Dep()     // dep可以收集依赖,收集的时watcher
    Object.defineProperty(data, key, {
        get() {
            if (Dep.target) {  // 这次用的时渲染watcher
                //watcher不能重复,如果重复会造成渲染的时候出现多此渲染
                dep.depend();   // 让dep中可以存放watcher,也希望让watcher可以存放dep,实现一个多对多的关系
                dep.addSub(Dep.target)
            }
            return value
        },
        set(newValue) {
            if (newValue === value) return
            observer(newValue)      // 如果是新增的对象的话,也需要进行一次监听
            value = newValue
            dep.notify()
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
