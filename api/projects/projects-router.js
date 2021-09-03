// Write your "projects" router here!
const express = require('express')

const router = express.Router()

const Project = require('./projects-model')

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

module.exports = router