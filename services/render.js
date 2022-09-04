const {User, Comment, Reply} = require('../models/comments')

exports.comments = (req, res) =>{
  Comment.find({}).populate({path:'replies', model:'Reply', populate: {
    path: 'user',
    model: 'User'
  }}).populate({path:'user'})
  .then(data =>{
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
// exports.edit_project = (req, res) => {

//   if(!req.body){
//     return res
//     .status(400)
//     .send({message: 'nothing to update'})
//   }
//     let title = req.body.title
//     let description = req.body.description
//     const projectId = req.params.projectId
//     let project = new Project({
//       title: title,
//       description : description
//      })
//      Project.findByIdAndUpdate(projectId, req.body,{useFindAndModify:false})
//        .then(data =>{
//         if(!data){
//           res.status(404).send({message: 'cannot update'})
//         } else{
//           res.send('a project has been updated')
//         }
//        })
//        .catch(err =>{
//         res.status(500).send({message:'error update user info'})
//        })

// }
exports.delete_comment = (req, res) => {
  let commentId = req.params.id
  Comment.findByIdAndDelete(commentId, err =>{
    if(err) console.log(err)
   

   })
 
   
};
exports.delete_reply = (req, res) => {
  let replyId = req.params.replyId
  let commentId = req.params.commentId
  Reply.findByIdAndDelete(replyId, err =>{
    if(err) return console.log(err)
   })
   Comment.updateOne({ _id: commentId }, { "$pull": { "replies": { $eq: replyId } }}, { safe: true, multi:true }, function(err, obj) {
    if(err) return console.log(err)
    res.redirect('/')})
 
   }

  


// exports.tickets = (req, res) =>{
//     let title = ''
//     let description = ''
//     let type = ''
//     let priority = ''
//     let status = ''
//     let id = req.params.id
//     let userId = req.user._id
//     Project.find({user:userId})
//     .exec(function (err, projects) {
//     Project.find({_id:id}).populate('tickets')
//     .then(data =>{
//       res.render('pages/tasks', {
//         projects:projects,
//         project: data,
//         userId: userId,
//         title: title,
//         description: description,
//         type: type,
//         priority: priority,
//         status: status,
//         id: id
//       })
//       }
//     )
//     .catch(err=>{
//       console.log(err)
//     })   
//   })
// }

// exports.add_ticket = (req, res) => {
//   let username = req.user.username
//   let title = req.body.title
//   let description = req.body.description
//   let type = req.body.type
//   let priority = req.body.priority
//   let status = 'open'
//   let projectId = req.params.id
//   let user = req.user._id
//   let ticket = new Ticket({
//     title: title,
//     projectId:projectId,
//     description : description,
//     type:type,
//     priority:priority,
//     status:status,
//     user: user,
//     username:username
//    })
//    ticket.save(err =>{
//     if(err) console.log(err)
    
//    })
//    Project.findOne({_id:projectId}, (err, data)=>{
//     if(err) return console.log(err)
//     data.tickets.push(ticket)
//     data.save(err =>{
//       if(err) console.log(err)
//       res.redirect(`/projects/${projectId}`)
//      })
//    })

// }
// exports.edit_ticket = (req, res) => {
//   let title = req.body.title
//   let description = req.body.description
//   let type = req.body.type
//   let priority = req.body.priority
//   let status = req.body.status
//   let ticketId = req.params.ticketId

//  let ticket = new Ticket({
//   title:title,
//   description : description,
//   type:type,
//   priority:priority,
//   status:status
//  })

//  Ticket.findByIdAndUpdate(ticketId, req.body,{useFindAndModify:false})
//  .then(data =>{
//   if(!data){
//     res.status(404).send({message: 'cannot update'})
//   } else{
//     res.send('a ticket has been updated')
//   }
//  })
//  .catch(err =>{
//   res.status(500).send({message:'error update user info'})
//  })

// }
// exports.delete_ticket = (req, res) => {
//   let ticketId = req.params.id
//   let projectId = req.params.projectId
 
//   Ticket.findByIdAndDelete(ticketId, err =>{
//     if(err) return console.log(err)
//    })
//    Project.updateOne({ _id: projectId }, { "$pull": { "tickets": { $eq: ticketId } }}, { safe: true, multi:true }, function(err, obj) {
//     if(err) return console.log(err)
//     res.redirect(`/projects/${projectId}`)}

// )}
    
// exports.workspace = (req, res) =>{
//   let id = req.params.id
//   let ticketId = req.params.ticketId
//   let userId = req.user._id
//   Project.find({user:userId}).populate('tickets') 
//     .exec(function (err, projects) {
//     Ticket.find({_id:ticketId}).populate('projectId').exec(function (err, ticket) {
//       if(err) console.log(err)
//         res.render('pages/workspace', {
//             projects : projects,
//             ticket : ticket,
//             ticketId:ticketId,
//             userId:userId,
//             id:id
//         });
//     });
// });
// }
 
    
  


   