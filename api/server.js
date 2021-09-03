const express = require('express');
const server = express();

// Configure your server here
// Build your actions router in /api/actions/actions-router.js
// Build your projects router in /api/projects/projects-router.js
// Do NOT `server.listen()` inside this file!
server.use(express.json())

const projectsRouter = require('./projects/projects-router')
const actionsRouter = require('./actions/actions-router')

server.use('/api/projects', projectsRouter)
server.use('/api/actions', actionsRouter)

// sanity check / default route endpoint
server.get('/', (req, res) => {
    res.send(`
    <h1>API</h1>
    <p>Welcome to the API</p>
    `)
})

module.exports = server;
