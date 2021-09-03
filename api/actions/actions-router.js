// Write your "actions" router here!
const express = require('express')

const router = express.Router()

const Action = require('./actions-model')

// ACTIONS ENDPOINTS
router.get('/', (req, res) => {
    Action.get()
        .then(actions => {
            res.status(200).json(actions)
        })
        .catch(err => {
            console.log(err)
            res.status(500).json({ message: 'Error retrieving the actions'})            
        })
})

router.get('/:id', (req, res) => {
    Action.get(req.params.id)
        .then(action => {
            if (action) {
                res.json(action)
            } else {
                res.status(404).json({
                    message: 'Action could not be found'
                })
            }            
        })
        .catch(err => {
            console.log(err)
            res.status(500).json({
                message: 'Error receiving the action'
            })
        })
})

module.exports = router