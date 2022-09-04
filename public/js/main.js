



(function() {
    const deleteButtons = document.querySelectorAll('.deleteButton')
    const modalPopup = document.querySelector('.deleteContainer')
    const hideModalButton = document.querySelector('.hideModal')
    const approveDelete = document.querySelector('.approveDelete')
    let replyId
    let commentId
    let replyCommentId
    deleteButtons.forEach(button => {
        button.addEventListener('click', () => {
        const modalPopup = document.querySelector('.deleteContainer')
        modalPopup.classList.add('show')
       
        if(button.classList.contains('deleteComment')) {
            commentId = button.dataset.id
            deleteComment()
        }
        if(button.classList.contains('deleteReply')) {
            replyId = button.dataset.id
            replyCommentId = button.dataset.commentid
            deleteReply()
        }
      
        
    
        })
    })
    modalPopup.addEventListener('click', (e) => {
        if(e.target.classList.contains('show')) modalPopup.classList.remove('show')
    })
    hideModalButton.addEventListener('click', () => {
        modalPopup.classList.remove('show')
    })
    function deleteComment() {
        approveDelete.addEventListener('click', () => {
            const req = new XMLHttpRequest()
            console.log(commentId)
            req.open('DELETE', `http://localhost:5000/delete-comment/${commentId}`, true)
            req.onreadystatechange = function() {
                if (req.status !== 200 && req.readyState !== 4) {
                    throw new Error ('Bad Request')
                   
              };//end onreadystate
            }
            req.send()
            location.reload()
        })
    }
    function deleteReply() {
        approveDelete.addEventListener('click', () => {
            const req = new XMLHttpRequest()
    
            req.open('DELETE', `http://localhost:5000/${replyCommentId}/delete-reply/${replyId}`, true)
            req.onreadystatechange = function() {
                if (req.status !== 200 && req.readyState !== 4) {
                    throw new Error ('Bad Request')
                   
              };//end onreadystate
            }
            req.send()
            location.reload()
        })
    }
    
})();
(function() {
    const editButtons = document.querySelectorAll('.editButton')
    //https://plnkr.co/edit/hi6zoBbDbBiSRftV?p=preview&preview

editButtons.forEach(button => {
    
    if(button.classList.contains('editComment')) {
        const container = button.closest('.info');
        const editSection = container.querySelector('.editable')
        const form = container.querySelector('.editForm')
        const textarea = form.querySelector('.textarea')
        const updateButton = form.querySelector('.updateButton')
        let commentId
        
        button.addEventListener('click', () => {
            form.classList.toggle('show')
            editSection.classList.toggle('hide')
           commentId = button.dataset.id
            const buttonContainer = editSection.nextElementSibling
     
            textarea.value = editSection.innerText
           
            textarea.focus()
            buttonContainer.classList.add('show')
if(commentId) {
   
        updateButton.addEventListener('click', (e) => {

            const req = new XMLHttpRequest()
            req.open('PUT', `http://localhost:5000/comment/${commentId}`)
            req.setRequestHeader('Content-Type', 'application/json')
            req.addEventListener('load', function() {
              if(req.status === 200 && req.readyState === 4) {
              location.reload()
        
              } else {
                throw new Error ('Bad request')
              }
            })
            req.send(JSON.stringify({content:textarea.value}))
        })
    
}
           
         
        })
    }
    if(button.classList.contains('editReply')) {
        const container = button.closest('.info');
        const editSection = container.querySelector('.editable')
        const mainText = editSection.querySelector('.mainText')
        const form = container.querySelector('.editForm')
        const textarea = form.querySelector('.textarea')
        const updateButton = form.querySelector('.updateButton')
        let replyId 
        button.addEventListener('click', () => {
            form.classList.toggle('show')
            editSection.classList.toggle('hide')
            replyId = button.dataset.id
            const buttonContainer = editSection.nextElementSibling
            
            
            
        
            textarea.value = mainText.innerText
           
            textarea.focus()
            buttonContainer.classList.add('show')
         


            if(replyId) {
       
    
                updateButton.addEventListener('click', (e) => {
        
                    const req = new XMLHttpRequest()
                    req.open('PUT', `http://localhost:5000/reply/${replyId}`)
                    req.setRequestHeader('Content-Type', 'application/json')
                    req.addEventListener('load', function() {
                      if(req.status === 200 && req.readyState === 4) {
                      mainText.innerText=textarea.value
                
                      } else {
                        throw new Error ('Bad request')
                      }
                    })
                    req.send(JSON.stringify({content:textarea.value}))
                })
           
           }
        })
       
      
    
    }
    
    
    
   
})
})();
(function() {
const replyButtons = document.querySelectorAll('.replyButton')
replyButtons.forEach(button => {
    button.addEventListener('click', () => {
        const container = button.closest('.comment');
        const replySection = container.nextElementSibling
        replySection.classList.toggle('show')
        
    })
})
})();

(function() {
    const upvoteButtons = document.querySelectorAll('.upvote')

    upvoteButtons.forEach(button => {
        const upvoteContainer = button.parentNode
        let score = Number(upvoteContainer.querySelector('.score').innerText)
        let upvoted
        let downvoted
        button.addEventListener('click', (e) => {
         
            console.log(score)
            var elems = upvoteContainer.querySelector(".selected");
            if(elems !==null){
             elems.classList.remove("selected");
             if(button.classList.contains('plus')) {
                score--
                upvoteContainer.querySelector('.score').innerText=score
                upvoted = false
                console.log(score)
            
            }
            if(button.classList.contains('minus')) {
                score++
                upvoteContainer.querySelector('.score').innerText=score
                downvoted = false
            }
            }
            else {
                e.target.classList.add("selected");
                if(button.classList.contains('plus')) {
                    score++
                    upvoted = true
                    upvoteContainer.querySelector('.score').innerText=score
                
                
                }
                if(button.classList.contains('minus')) {
                    score--
                    upvoteContainer.querySelector('.score').innerText=score
                    downvoted = true
                }
            }
            if(upvoteContainer.dataset.replyid) {
                var data = {
                    upvoted: upvoted,
                    downvoted:downvoted,
                    score: score
                  
                };
                const replyId = upvoteContainer.dataset.replyid
                const req = new XMLHttpRequest()
              req.open('PUT', `http://localhost:5000/reply/${replyId}`)
              req.setRequestHeader('Content-Type', 'application/json')
              req.addEventListener('load', function() {
                if(req.status === 200 && req.readyState === 4) {
                  location.reload()
                } else {
                  throw new Error ('Bad request')
                }
              })
              req.send(JSON.stringify(data))
            }
            if(upvoteContainer.dataset.commentid) {
                var data = {
                    upvoted: upvoted,
                    downvoted:downvoted,
                    score: score
                  
                };
                const commentId = upvoteContainer.dataset.commentid
                const req = new XMLHttpRequest()
              req.open('PUT', `http://localhost:5000/comment/${commentId}`)
              req.setRequestHeader('Content-Type', 'application/json')
              req.addEventListener('load', function() {
                if(req.status === 200 && req.readyState === 4) {
                  location.reload()
                } else {
                  throw new Error ('Bad request')
                }
              })
              req.send(JSON.stringify(data))
            }
           
           
           
            
        })
        
    })
    })()




