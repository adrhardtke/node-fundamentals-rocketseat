import { Readable } from 'node:stream'

class OneToHoundredStream extends Readable {
    index = 1

    _read(){
        const i = this.index++
       setTimeout(() => {
            if(i > 100){
                this.push(null)
            }
            else {
                const buf = Buffer.from(String(i))
                this.push(buf)
            }
       }, 1000);
    }
}

fetch('http://localhost:3001', {
    method: 'POST',
    body: new OneToHoundredStream()
}).then(response => {
    response.text().then(data => {
        console.log(data)
    })
})