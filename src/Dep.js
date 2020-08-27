/**
 * Dep可以看作是对需要转变为响应属性的一个代理，它维护了一个订阅者的列表，当Dep对应的属性的值发生变化的时候它会通知这个订阅者列表里的所有的订阅者。
 * 每个订阅者其实是一个Watcher的实例
 */
class Dep {

    constructor() {
        this.subscribers = new Set()
    }

    depend() {
        if (Dep.target) {
            Dep.target.addDep(this)
        }
    }

    addSub(sub) {
        this.subscribers.add(sub)
    }

    notify() {
        console.log(this.subscribers)
        this.subscribers.forEach(sub => sub.update())
    }

}

/**
 * 当对一个响应属性进行访问的时候，即会调用该属性的getter
 * Dep.target是一个Watcher的实例
 */
Dep.target = null

export default Dep