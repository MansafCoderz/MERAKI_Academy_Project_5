const { notify } = require("./notifications");
const { messageHandler } = require("./SendMessage");

const clients = {};

const ioConnection = (socket) => {
  const userId = socket.handshake.headers.user_id;
  clients[userId] = { socket_id: socket.id, userId };
  messageHandler(socket);
  notify(socket);
  socket.on("disconnect", () => {
    for (const key in clients) {
      if (clients[key].socket_id === socket.id) {
        delete clients[key];
      }
    }
  });
};

module.exports = ioConnection;
