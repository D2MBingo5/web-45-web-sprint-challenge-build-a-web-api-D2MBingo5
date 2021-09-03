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

router.put('/:id', (req, res) => {
    const possibleProj = Project.get(req.params.id)
    if(!possibleProj) {
        res.status(404).json({ message: 'Post not found' })
    } else {
        if(!req.body.name || !req.body.description || !req.body.completed) { // putting 'completed: true' works, but putting 'completed: false' throws a 400 error. Putting 'completed: "string"' returns 'completed: false'. I'm very confused
            res.status(400).json({ message: 'Please provide name, description, and completion status' })            
        } else {
            Project.update(req.params.id, req.body)
                .then(() => {
                    return Project.get(req.params.id)
                })
                .then(project => {
                    res.status(200).json(project)
                })
                .catch(err => {
                    console.log(err)
                    res.status(500).json({ message: 'The project information could not be updated' 
                })
            })
        }
    }
})

router.delete('/:id', (req, res) => {
    Project.remove(req.params.id)
        .then(proj => {
            if (proj) {
                res.json(proj)
            } else {
                res.status(404).json({ message: 'Project not found' })
            }
        })
        .catch(err => {
            console.log(err)
            res.status(500).json({ message: 'Project could not be removed' })
        })
})

router.get('/:id/actions', (req, res) => {
    Project.getProjectActions(req.params.id)
        .then(acts => {
            if (req.params.id) {
                res.json(acts)
            } else {
                res.status(404).json({ message: 'Project not found' })
            }
        })
        .catch(err => {
            console.log(err)
            res.status(500).json({ message: 'Actions could not be retrieved' })
        })
})

module.exports = router