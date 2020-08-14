import {initState} from './observe'
import Watcher from "./observe/watcher";
import {util, query, compiler} from './util'

// Vuez中用户传入的原始数据
function Vue(options) {
    // 初始化
    this._init(options)
}

Vue.prototype._init = function (options) {
    const vm = this
    // 挂载配置
    vm.$options = options
    // MVVM原理 数据重新初始化
    initState(vm);

    // 初始化Vue
    if (vm.$options.el) {
        vm.$mount()
    }
}


Vue.prototype._update = function () {
    // 用户入数据,更新视图
    const vm = this
    let el = vm.$el
    // --------------------以下逻辑后续会用虚拟DOM重写--------------------
    // 循环元素,将内容换成我们的数据
    // 创建一个文档碎片
    let node = document.createDocumentFragment();
    let firstChild = null
    while (firstChild = el.firstChild) {// 每次拿到第一个元素,就将这个元素放入到文档碎片中
        node.appendChild(firstChild)   // appendChild有移动的的功能
    }
    // 对文本进行替换处理
    compiler(node, vm)
    el.appendChild(node)
    // 需要匹配{{ }} 进行替换
}

// 渲染页面,对组件进行挂载
Vue.prototype.$mount = function () {
    let vm = this
    let el = vm.$options.el
    el = vm.$el = query(el) // 获取当前挂载的节点 vm.$el就是需要挂载的元素

    // 渲染是通过watcher渲染的
    // 渲染watcher 用于渲染的watcher

    // 更新组件,包括渲染逻辑
    let updateComponent = () => {
        console.log('执行')
        vm._update()    // 更新组件
    }
    // 渲染watcher
    new Watcher(vm, updateComponent)        //默认会调用updateComponent方法
}

export default Vue
