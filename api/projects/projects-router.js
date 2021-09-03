// Write your "projects" router here!
const express = require('express')

const router = express.Router()

const Project = require('./projects-model')

// PROJECTS ENDPOINTS
router.get('/', (req, res) => {
    // console.log('get request attempted')
    Project.get()
        .then(projects => {
            res.status(200).json(projects);
        })
        .catch(err => {
            console.timeLog(err)
            res.status(500).json({
                message: 'Error retrieving the projects'
            })
        })
})

router.get('/:id', (req, res) => {
    Project.get(req.params.id)
        .then(project => {
            if (project) {
                res.json(project)
            } else {
                res.status(404).json({ message: 'Project could not be found' })
            }
        })
        .catch(err => {
            console.log(err)
            res.status(500).json({ message: 'Error receiving the project'})
        })
})

router.post('/', (req, res) => {
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
            .catch(err => {
                console.log(err)
                res.status(500).json({ message: 'Error while saving post to database' })
            })
    }
})

module.exports = router