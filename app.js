const express = require(`express`)
const api = require('./db_api')
const bodyParser = require('body-parser')

const app = express()
const hostname = `127.0.0.1`
const port = 3000

app.use(bodyParser.json())

app.get('/', (req, res) => {
    res.set('Content-Type', 'application/json')
    res.writeHead(200)
    res.end('Hello, world')
})

app.get('/random', async (req, res) => {
    res.set('Content-Type', 'application/json')
    res.writeHead(200)
    res.end(JSON.stringify(await api.getRandomEntry(), null, 3))
})

app.get('/all', async (req, res) => {
    res.set('Content-Type', 'application/json')
    res.writeHead(200)
    res.end(JSON.stringify(await api.getAllEntries(), null, 3))
})

app.delete('/delete', async (req, res) => {
    res.set('Content-Type', 'application/json')
    res.writeHead(200)
    res.end(JSON.stringify(await api.recreateEntries(), null, 3))
})

app.post('/test', bodyParser.raw(), async (req, res) => {
    if (
        'content-type' in req.headers &&
        req.headers['content-type'] !== 'application/octet-stream'
    ) {
        res.writeHead(400)
        res.end('Bad Request')
        return
    }

    const buffer = Buffer.from(req.body)
    const entries = buffer.toString().split('\n').slice(1)
    entries.forEach((element) => {
        const temp = element.split(';')
        console.log(temp)
    })
    res.end()
})

app.listen(port, hostname)
console.log(`Server running at http://${hostname}:${port})`)
