import Observer from "./observer";

export function initState(vm) {
    console.log('init state')
    // 做不同的初始化工作
    let opts = vm.$options
    if (opts.data) {
        initData(vm)
    }
    if (opts.computed) {
        initComputed()
    }
    if (opts.watch) {
        initWatch()
    }
}

export function observer(data) {
    // 当data不是一个对象或者data是null,则不需要执行后续逻辑了
    if (typeof data !== 'object' || data == null) return
    return new Observer(data)
}

// 数据代理
function proxy(vm, source, key) {
    Object.defineProperty(vm, key, {
        get() {
            return vm[source][key]
        },
        set(newValue) {
            vm[source][key] = newValue
        }
    })
}

function initData(vm) {
    // 将用户传入的数据通过Object.definedProperty重新定义
    let data = vm.$options.data         // 用户传入的data
    /**
     * 1. 判断data是否是一个函数,如果是则取返回值
     * 2. 如果data不是一个函数,那么如果有data,则不改变,如果没有,则赋值为空对象
     * 3. 将data赋值给vm._data,实例操作自身的data,用户传入的data不做改变
     * */
    data = vm._data = typeof data === 'function' ? data.call(vm) : data || {}
    for (let key in data) {
        // 会将对vm上的取值,赋值操作代理给vm_data
        proxy(vm, '_data', key)
    }
    observer(vm._data)
}

function initComputed() {
}

function initWatch() {
}
