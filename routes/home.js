const express = require('express')
const router = express.Router()
const services = require('../services/render.js')




router.get('/', services.comments)
router.post('/add-comment', services.add_comment)
router.delete('/delete-comment/:id', services.delete_comment)
router.delete('/:commentId/delete-reply/:id', services.delete_reply)
router.post('/:userId/:commentId/add-reply', services.add_reply)
router.put('/reply/:replyId', services.edit_reply)
router.put('/comment/:commentId', services.edit_comment)
router.put('/comment/:id', services.comment_score)
router.put('/reply/:id', services.reply_score)

module.exports = router