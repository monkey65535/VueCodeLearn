
const defaultRE = /\{\{(?:.|\r?\n)\}\}/g
export const util = {
    getValue(vm, expr) {
        let keys = expr.split('.')
        return keys.reduce((memo, current) => {
            memo = memo[current]
            return memo
        }, vm)
    },
    // 编译文版 替换调{{}}
    compilerText(node, vm) {
        node.textContent = node.textContent.replace(defaultRE, (...args) => {
            return util.getValue(vm, args[1])
        })
    }
}

// 编译文档碎片
export function compiler(node, vm) {
    let childNodes = node.childNodes;

    [...childNodes].forEach(child => {
        if (child.nodeType === 1) { // 1表示元素,3表示文本
            //递归编译当前元素的子节点
            compiler(node.child, vm)
        } else if (child.nodeType === 3) {
            util.compilerText(child, vm)
        }
    })
}

export function query(el) {
    if (typeof el === 'string') {
        return document.querySelector(el)
    }
    return el
}
