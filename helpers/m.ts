import Con from './con'
let y = new Con();
let t = async () => {
    for (let i = 0; i < 2; i++) {
        await y.del({ ob: { "name": 'sid' } })
    }
    let c = null
    while(!c)
    c = y.close()
    console.log('closing')
    // c = y.close()
}
t()