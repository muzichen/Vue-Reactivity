import Dep from './Dep'

class Watcher {
    constructor(getter, cb) {
        this.getter = getter // getter是一个对响应属性具有引用的函数
        this.cb = cb
        this.value = this.get()
        this.cb(this.value, null)
    }

    get() {
        Dep.target = this
        const value = this.getter()  // 当调用getter方法时，因为getter对响应属性有引用，则会触发这些响应属性的getter，此时的Dep.target就是当前的Watcher，因为每个属性都对应一个dep实例，所以每个属性对应的实例会将当前的Watcher添加到自己的订阅者列表中
        Dep.target = null
        return value
    }

    addDep(dep) {
        dep.addSub(this)
    }

    update() {
        const value = this.get()
        const oldValue = this.value
        this.value = value
        this.cb(value, oldValue)
    }

}

export default Watcher