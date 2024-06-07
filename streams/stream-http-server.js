import http from 'node:http'
import { Transform } from 'node:stream'

class InverseNumber extends Transform {
    _transform(chunck, encoding, callback){
        const transformed = Number(chunck.toString()) * -1
        console.log(transformed)
        callback(null, Buffer.from(String(transformed))) // erro, dado transformado
    }
}

// req => como se fosse uma ReadableStream
// res => como se fosse uma WritableStream

const server = http.createServer(async (req, res) => {
    const buffers = []
    for await (const chunk of req){
        buffers.push(chunk)
    }

    const fullStreamContent = Buffer.concat(buffers).toString()
    console.log(fullStreamContent)

    // return req
    //     .pipe(new InverseNumber())
    //     .pipe(res)

    return res.end(fullStreamContent)
})

server.listen(3001)