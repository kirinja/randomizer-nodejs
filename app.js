const express = require(`express`)
const api = require('./db_api')

const app = express()
const hostname = `127.0.0.1`
const port = 3000

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

app.listen(port, hostname)
console.log(`Server running at http://${hostname}:${port})`)
