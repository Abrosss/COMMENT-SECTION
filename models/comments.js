const mongoose = require('mongoose')

//ticket schema

const UserSchema = mongoose.Schema({
    username: {type: String},
    image : {type: String},

})

const CommentSchema = mongoose.Schema({
    user: {type:mongoose.Schema.Types.ObjectId, ref: 'User'},
    username: {
        type:String
    },
    content: {
        type:String
    },
    created: { type: Date, default: Date.now },
    createdString : {
        type:String
    },
    score: {
        type:Number

    },
    replies : [{
        type:mongoose.Schema.Types.ObjectId, ref: 'Reply'
    }],
    upvoted : {
        type:Boolean
    },
    downvoted : {
        type:Boolean
    },

})
const ReplySchema = mongoose.Schema({
    content: {
        type:String
    },
    created: { type: Date, default: Date.now },
    createdString : {
        type:String
    },
    score: {
        type:String
    },
    replyingTo: {type:mongoose.Schema.Types.ObjectId, ref: 'User'},
    user : {type:mongoose.Schema.Types.ObjectId, ref: 'User'},
    upvoted : {
        type:Boolean
    },
    downvoted : {
        type:Boolean
    },
    
    
})

const User = mongoose.model("User", UserSchema)
const Comment = mongoose.model("Comment", CommentSchema)
const Reply = mongoose.model('Reply', ReplySchema)

module.exports = {User, Comment, Reply}