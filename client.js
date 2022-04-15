
const socket = io('http://localhost:8000');

// Get DOM elements in respective of Js variables
const form =document.getElementById('send-container');
const messageInput=document.getElementById('messageInp');
const messageContainer=document.querySelector(".container");

// Audio that will play on receiving messages
var audio = new Audio("./ting.mp3");

// function which will append event info to the container
const apend=(message,position)=>{
    //console.log(message);
const messageElement = document.createElement("div");
 messageElement.innerText= message;
 messageElement.classList.add('message_box');
 messageElement.classList.add(`${position}`);
 messageContainer.append(messageElement);
 if(position=="left"){
    audio.play();
}
}

// If the form get submitted,send the server the message
form.addEventListener('submit',(e)=>{
    e.preventDefault();
    const message = messageInput.value;
    apend(`You:${message}`,'right');
    socket.emit('send',message);
    messageInput.value =''
})

// Ask new user for his/her name and let the server know
const name = prompt("Enter your name to join");
socket.emit('New-user-joined',name);

// If a new user joins, receive his/her name for the  server 
socket.on('user-joined',(name)=>{
apend(`${name} joined the chat`,'right')
})

// If server sends the message, receive it
socket.on('receive',(data)=>{
apend(`${data.name}:${data.message}`,'left')
})

// If a user leaves the chat,append the info to the container
socket.on('left',(name)=>{
    apend(`${name} left the chat`,'left')
})