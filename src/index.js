import Vue from 'vue'

let vm = new Vue({
    el: '#app',
    data() {
        return {
            msg: "hello",
            school: {name: "123", age: 10},
            arr: [1, 2, 3, 4]
        }
    },
    computed: {},
    watch: {}
})
vm.arr.push(4)
console.log(vm)
