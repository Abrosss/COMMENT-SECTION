const {User, Comment, Reply} = require('../models/comments')

exports.comments = (req, res) =>{
  Comment.find({}).populate({path:'replies', model:'Reply', populate: [{
    path: 'user',
    model: 'User'
   },{
     path: 'replyingTo',
     model: 'User' 
   }] }).populate({path:'user'})
  .then(data =>{
    console.log(data)
    res.render('index', {
      comments: data
  
    })
 
    }
  )
  .catch(err=>{
    console.log(err)
  })
}
exports.add_comment = (req, res) =>{
  let content = req.body.content
  let userId ='63144e8ec1250ba70cc3efbb'
  let score = 0
  let comment = new Comment({
    content: content,
    user : userId,
    score: score
   })
   comment.save(err =>{
    if(err) console.log(err)
    res.redirect('/')
    
   })
  
}
exports.add_reply = (req, res) => {
  let content = req.body.content
  let score = 0
  let commentId = req.params.commentId
  let replyingTo = req.params.userId
  let userId = '63144e8ec1250ba70cc3efbb'
  let reply = new Reply({
    content: content,
    score:score,
    replyingTo : replyingTo,
    user:userId,
   })
   reply.save(err =>{
    if(err) console.log(err)
    
   })
   Comment.findOne({_id:commentId}, (err, data)=>{
    if(err) return console.log(err)
    data.replies.push(reply)
    data.save(err =>{
      if(err) console.log(err)
      res.redirect('/')
     })
   })

}
exports.edit_reply = (req, res) => {

  if(!req.body){
    return res
    .status(400)
    .send({message: 'nothing to update'})
  }
    let content = req.body.content
    const replyId = req.params.replyId
    let reply = new Reply({
      content: content
     })
     Reply.findByIdAndUpdate(replyId, req.body,{useFindAndModify:false})
       .then(data =>{
        if(!data){
          res.status(404).send({message: 'cannot update'})
        } else{
          res.send('a reply has been updated')
        }
       })
       .catch(err =>{
        res.status(500).send({message:'error update user info'})
       })

}
exports.edit_comment = (req, res) => {

  if(!req.body){
    return res
    .status(400)
    .send({message: 'nothing to update'})
  }
    let content = req.body.content
    const commentId = req.params.commentId
    let comment = new Comment({
      content: content
     })
     Comment.findByIdAndUpdate(commentId, req.body,{useFindAndModify:false})
       .then(data =>{
        if(!data){
          res.status(404).send({message: 'cannot update'})
        } else{
          res.send('a reply has been updated')
        }
       })
       .catch(err =>{
        res.status(500).send({message:'error update user info'})
       })

}
exports.comment_score = (req, res) => {

  if(!req.body){
    return res
    .status(400)
    .send({message: 'nothing to update'})
  }
    let score = req.body.score
    let upvoted = req.body.upvoted
    let downvoted = req.body.downvoted
    
    const commentId = req.params.id
    let comment = new Comment({
      score: score,
      upvoted:upvoted,
      downvoted:downvoted
     })
     Comment.findByIdAndUpdate(commentId, req.body,{useFindAndModify:false})
       .then(data =>{
        if(!data){
          res.status(404).send({message: 'cannot update'})
        } else{
          res.send('a reply has been updated')
        }
       })
       .catch(err =>{
        res.status(500).send({message:'error update user info'})
       })

}
exports.reply_score = (req, res) => {

  if(!req.body){
    return res
    .status(400)
    .send({message: 'nothing to update'})
  }
  let score = req.body.score
  let upvoted = req.body.upvoted
  let downvoted = req.body.downvoted
    const replyId = req.params.id
    let reply = new Reply({
      score: score,
      upvoted:upvoted,
      downvoted:downvoted
     })
     Reply.findByIdAndUpdate(replyId, req.body,{useFindAndModify:false})
       .then(data =>{
        if(!data){
          res.status(404).send({message: 'cannot update'})
        } else{
          res.send('a reply has been updated')
        }
       })
       .catch(err =>{
        res.status(500).send({message:'error update user info'})
       })

}
exports.delete_comment = (req, res) => {
  let commentId = req.params.id
  Comment.findByIdAndDelete(commentId, err =>{
    if(err) console.log(err)
   

   })
 
   
};
exports.delete_reply = (req, res) => {
  let replyId = req.params.id
  let commentId = req.params.commentId
  console.log(replyId, commentId)
  Reply.findByIdAndDelete(replyId, err =>{
    if(err) return console.log(err)
   })
   Comment.updateOne({ _id: commentId }, { "$pull": { "replies": { $eq: replyId } }}, { safe: true, multi:true }, function(err, obj) {

    if(err) return console.log(err)
    })
 
   }

