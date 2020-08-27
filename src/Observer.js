import Dep from './Dep'

class Observer {
    constructor(data) {
        this.data = data
        this.walk(data)
    }

    walk(data) {
        if (!data || typeof data !== 'object') {
            throw TypeError('data must be an object type')
        }
        Object.keys(data).forEach(key => {
            this.defineReactivity(data, key, data[key])
        })
    }

    defineReactivity(data, key, value) {
        if (typeof value === 'object') {
            this.walk(value)
        }
        const dep = new Dep() // 每次都要生产一个dep实例，比较占用空间
        Object.defineProperty(data, key, {
            enumerable: true,
            configurable: true,
            get: function reactiveGetter() {
                if (Dep.target) {
                    dep.depend()
                }
                return value
            },
            set: function reactiveSetter(newValue) {
                if (value === newValue) {
                    return
                }
                value = newValue
                dep.notify() // 当某个属性的值发生变化的时候，通知该属性的所有的Subscriber
            }
        })
    }

}

export default Observer