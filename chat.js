//initialize socket.io
var socket = io()

//$() //shorthand document.ready
$(()=>{
    $('#send').click(()=>{
       var message = {name:$('#name').val(),message:$('#message').val()}
       postMessages(message)//these are empty sinces it's HTML parsed... go to server app.use()
        //addMessage({name:'Tim',message:'hello'})//for now addMessage Sends static json

    })
    getMessages()// gets the messages
})

socket.on('message',addMessage)//NAME only

function addMessage(message){
    $('#messages').append(`<h4> ${message.name}</h4> <p>${message.message}</p>`)// javascript template literals `
}

function getMessages(){
    $.get('/messages',(data)=>{

        // data.forEach(element => {
        //     addMessage(element)
        // });
        data.forEach(addMessage); //shorthand of above. since element is passed to addMessage
    })
}
function postMessages(message){
    $.post('/messages',message)
}