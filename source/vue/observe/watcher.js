// 每一个watcher都要有一个唯一表示
let id = 0

class Watcher {
    /**
     * @parma {VueObject} vm 当前组件的实例
     * @param {any} exprOrFn  用户传入的,可能是一个表达式,也可能是一个函数
     * @param {function} cb 用户传入的回调函数,vm.$watch('msg','cb')
     * @param {Object} opts // 一些其他参数
     * */
    constructor(vm, exprOrFn, cb = () => {
    }, opts = {}) {
        this.vm = vm
        this.exprOrFn = exprOrFn
        if (typeof exprOrFn === "function") {
            this.getter = exprOrFn      // getter 就是newWatcher传入的第二个函数
        }
        this.cb = cb
        this.opts = opts
        this.id = id++
        this.get()// 默认watcher会调用自身的get方法
    }

    get() {
        this.getter()//让当前传入的函数执行

    }
}

// 渲染使用,计算属性需要使用,$watch也需要使用
export default Watcher
