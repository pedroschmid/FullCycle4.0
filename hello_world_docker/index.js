const express = require('express')

const server = express()

server.get('/', (req, res, next) => res.send('Eu sou Full Cycle. ^_^'))

server.listen(8080, () => console.log('server listening on port 8080...'))