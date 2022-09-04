



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
            replyCommentId = button.dataset.commentId
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
    button.addEventListener('click', () => {
        const container = button.closest('.infoTop');
        const editSection = container.nextElementSibling
        const updateButton = editSection.nextElementSibling
        const textarea = document.createElement('textarea')
        textarea.classList.add('textarea')
        textarea.value = editSection.innerText
        editSection.replaceWith(textarea)
        textarea.focus()
        updateButton.classList.add('show')

    })
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
})()





