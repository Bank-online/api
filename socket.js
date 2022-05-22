let io;
const service = {};

const socketConnection = (ioServer) => {
  io = ioServer;

  io.on("connection", (socket) => {
    //socket permettant de mettre un user dans la rooms lorsque il est connecter
    socket.on("authSocket", (e) => {
      if (e.uuid && e.forename) {
        console.log("connection de l'utilisateur : " + e.forename);
        io.to(e.uuid);
      }
    });
    socket.on("error", (err) => {
      console.log("ERROR SERVER : ", err);
      if (err && err.message === "unauthorized event") {
        socket.disconnect();
      }
    });
    socket.on("disconnect", (err) => {
      console.log("ERROR SOCKET :", err);
    });
  });
};

module.exports = {
  socketConnection,
  service,
  io,
};
