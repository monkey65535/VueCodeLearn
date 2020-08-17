let id = 0;

class Dep {
    constructor() {
        this.id = id++;
        this.subs = [];
    }

    addSub(watcher) {
        // 订阅 当调用addSub时,传入的内容放到this.subs中
        this.subs.push(watcher)
    }

    nofify() {
        this.subs.forEach(watcher => watcher.update())
    }

    depend() {
        // 防止直接调用target方法
        if (Dep.target) {
            // 希望可以在watcher中互相记忆
            Dep.target.addDep(this)
        }
    }
}

// 用来收集依赖,收集到的时一个个的watcher
export default Dep

// 用来保存当前的watcher
let stack = []

export function pushTarget(watcher) {
    Dep.watcher = watcher
    stack.push(watcher)
}

export function popTarget() {
    stack.pop()
    Dep.target = stack[stack.length - 1]
}
