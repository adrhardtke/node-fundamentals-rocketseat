// process.stdin.pipe(process.stdout)

// Stream de leitura
import { Readable, Writable, Transform } from 'node:stream'

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

// new OneToHoundredStream().pipe(process.stdout)


// stream de escrita
// import { Writable } from 'node:stream'

class InverseNumber extends Transform {
    _transform(chunck, encoding, callback){
        const transformed = Number(chunck.toString()) * -1
        callback(null, Buffer.from(String(transformed))) // erro, dado transformado
    }
}

class MultiplyByTenStream extends Writable {
    index = 1

    _write(chunck, encoding, callback){
        console.log(Number(chunck.toString()) * 10)
        callback()
    }
}

new OneToHoundredStream()
    .pipe(new InverseNumber())
    .pipe(new MultiplyByTenStream())


// duplex: stream de leitura e escrita