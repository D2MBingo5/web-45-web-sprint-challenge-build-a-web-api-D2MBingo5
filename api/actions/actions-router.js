// Write your "actions" router here!
const express = require('express')

const router = express.Router()

const Action = require('./actions-model')

// ACTIONS ENDPOINTS
router.get('/', (req, res, next) => {
    Action.get()
        .then(actions => {
            res.status(200).json(actions)
        })
        .catch(next)
})

router.get('/:id', (req, res, next) => {
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
        .catch(next)
})

router.post('/', (req, res, next) => {
    const newAct = req.body
    if(!newAct.project_id || !newAct.description || !newAct.notes) {
        res.status(400).json({ message: 'Please provide notes, description, and project_id' })
    } else {
        Action.insert(newAct)
            .then(({ id }) => {
                return Action.get(id)
            })
            .then(action => {
                res.status(201).json(action)
            })
            .catch(next)
    }
})

router.put('/:id', (req, res, next) => {
    const updateAct = req.body
    if(!updateAct.project_id || !updateAct.description || !updateAct.notes) {
        res.status(400).json({ message: 'Please provide notes, description, and project_id' })
    } else {
        Action.update(req.params.id, updateAct)
            .then(({ id }) => {
                return Action.get(id)
            })
            .then(action => {
                res.status(201).json(action)
            })
            .catch(next)
    }
})

router.delete('/:id', (req, res, next) => {
    Action.remove(req.params.id)
        .then(act => {
            if (act) {
                res.json(act)
            } else {
                res.status(404).json({ message: 'Action not found' })
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