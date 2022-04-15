// Node server which will handle socket io connections
const http = require('http');
const port=8000;
const server = http.createServer((req, res) => {
}).listen(port);



const io = require('socket.io')(server, {
    cors: {
      origin: '*',
    }
  });


const users ={};
io.on('connection',(socket)=>{
// If any new user joins,let other users connected the server know
    socket.on('New-user-joined',name=>{
        console.log("New-user",name);
        users[socket.id]=name;
        socket.broadcast.emit('user-joined',name);
    });
   
// If someone sends a message,broadcast it to other people
socket.on('send',(message)=>{
    socket.broadcast.emit('receive',{message:message, name:users[socket.id]})
});

// If someone leaves the chat,let others know
socket.on('disconnect',() =>{
  socket.broadcast.emit('left',users[socket.id]);
  delete users[socket.id];
});
})


