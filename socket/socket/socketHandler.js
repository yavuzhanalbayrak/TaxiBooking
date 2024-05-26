const socketio = require("socket.io");

function initializeSocket(httpServer) {
  const io = socketio(httpServer, {
    cors: {
      origin: process.env.VITE_FE_PORT,
      methods: ["GET", "POST"],
    },
  });

  const users = {};

  io.on("connection", (socket) => {
    console.log("New client connected",socket.id);

    socket.on("register", (userId) => {
      users[userId] = socket.id;
      console.log(`User registered: ${userId} with socket id: ${socket.id}`);
    });

    socket.on("joinRoom", (room) => {
      socket.join(room);
      console.log(`Client joined room: ${room}`);
    });

    socket.on("message", ({ message, room }) => {
      console.log(`Received message: ${message} in room: ${room}`);
      io.to(room).emit("message", message); // Send message to the specific room
    });

    socket.on("privateMessage", ({ message, toUserId }) => {
      const toSocketId = users[toUserId];
      console.log(
        `Received private message: ${message} to user: ${toUserId} with socket id: ${socket.id}`
      );
      if (toSocketId) {
        io.to(toSocketId).emit("privateMessage", message);
      }
    });

    socket.on("disconnect", () => {
      console.log("Client disconnected");
      for (let userId in users) {
        if (users[userId] === socket.id) {
          delete users[userId];
          break;
        }
      }
    });
  });
}

module.exports = initializeSocket;
