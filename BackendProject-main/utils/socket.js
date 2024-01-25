export {};

import Server from 'socket.io';

const io = new Server();


const Socket = {
  emit: function (event, data) {
    console.log(data,"dd");
    io.sockets.to(data.user).emit(event, data);
  }
};
   
export default Socket;
