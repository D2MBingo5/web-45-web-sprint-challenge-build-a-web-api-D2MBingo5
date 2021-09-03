// Write your "projects" router here!
const express = require('express')

const router = express.Router()

const Project = require('./projects-model')

// PROJECTS ENDPOINTS
router.get('/', (req, res, next) => {
    // console.log('get request attempted')
    Project.get()
        .then(projects => {
            res.status(200).json(projects)
        })
        .catch(next)
})

router.get('/:id', (req, res, next) => {
    Project.get(req.params.id)
        .then(project => {
            if (project) {
                res.json(project)
            } else {
                res.status(404).json({ message: 'Project could not be found' })
            }
        })
        .catch(next)
})

router.post('/', (req, res, next) => {
    const newProj = req.body
    if(!newProj.name || !newProj.description) {
        res.status(400).json({ message: 'Please provide name and description' })
    } else {
        Project.insert(newProj)
            .then(({ id }) => {
                return Project.get(id)
            })
            .then(project => {
                res.status(201).json(project)
            })
            .catch(next)
    }
})

router.put('/:id', (req, res, next) => {
    // putting 'completed: true' works, but putting 'completed: false' throws a 400 error. Putting 'completed: "string"' returns 'completed: false'. I'm very confused
    // this (functionally) same code block passes when used for actions; there's just something about the completed field boolean that I don't know how to work with
    const updateProj = req.body
    if(!updateProj.name || !updateProj.description || !updateProj.completed) {
        res.status(400).json({ message: 'Please provide name, description, and completion status' })
    } else {
        Project.update(req.params.id, updateProj)
            .then(({ id }) => {
                return Project.get(id)
            })
            .then(action => {
                res.status(201).json(action)
            })
            .catch(next)
    }
})

router.delete('/:id', (req, res, next) => {
    Project.remove(req.params.id)
        .then(proj => {
            if (proj) {
                res.json(proj)
            } else {
                res.status(404).json({ message: 'Project not found' })
            }
        })
        .catch(next)
})

router.get('/:id/actions', (req, res, next) => {
    Project.getProjectActions(req.params.id)
        .then(acts => {
            if (req.params.id) {
                res.json(acts)
            } else {
                res.status(404).json({ message: 'Project not found' })
            }
        })
        .catch(next)
})

// eslint-disable-next-line
router.use((err, req, res, next) => {
    console.log(err.message)
    res.status(err.status || 500).json({
        message: err.message,
        customMessage: 'Request could not be performed'
    })
})

module.exports = router