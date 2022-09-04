const express = require('express')
const router = express.Router()
const services = require('../services/render.js')




router.get('/', services.comments)
router.post('/add-comment', services.add_comment)
router.delete('/delete-comment/:id', services.delete_comment)
router.delete(':commentId/delete-reply/:id', services.delete_reply)
// router.put('/:projectId', services.edit_project)



// router.get('/:id', isUser, services.tickets)

// router.post('/:id/add-ticket', services.add_ticket)

// router.put('/:id/edit-ticket/:ticketId', services.edit_ticket)

// router.get('/:projectId/delete-ticket/:id', services.delete_ticket)

// router.get('/:id/:ticketId', isUser, services.workspace)

module.exports = router