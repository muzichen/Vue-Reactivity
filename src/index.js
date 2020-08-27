import Observer from './Observer'
import Watcher from './Watcher'

window.data = {
    a: 123,
    b: 234,
    c: {
        d: 345
    }
}

new Observer(data)

const render = () => {
    const result = data.a + data.b
    document.getElementById('app').innerText = result
}

new Watcher(render, () => {
    console.log(data)
})

