"use strict";

/**
 * An asynchronous bootstrap function that runs before
 * your application gets started.
 *
 * This gives you an opportunity to set up your data model,
 * run jobs, or perform some special logic.
 *
 * See more details here: https://strapi.io/documentation/developer-docs/latest/setup-deployment-guides/configurations.html#bootstrap
 */
const { findUser, createUser } = require("./utils/database");

module.exports = () => {
  var io = require("socket.io")(strapi.server, {
    cons: {
      origin: "http://localhost:3000",
      methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
      allowedHeaders: ["my-custom-header"],
      credentials: true,
    },
  });

  io.on("connection", (socket) => {
    socket.on("join", async ({ username, room }, callback) => {
      try {
        const userExists = await findUser(username, room);
        if (userExists.length > 0) {
          callback(
            `Usuário ${username} já existe na sala ${room}. Selecione outro nome ou sala.`
          );
        } else {
          const user = await createUser({
            username: username,
            room: room,
            status: "online",
            socketId: socket.id,
          });

          if (user) {
            socket.join(room);
            socket.emit("welcome", {
              user: 'bot',
              text: `Usuário ${user.username} Bem-Vindo ao Chat ${room}.`,
              userData: user,
            });
            socket.broadcast.to(user.room).emit('message', { user: 'bot' }');
            callback();
          }
        }
      } catch (error) {}

      console.log("user connected");
      console.log("username is ", username);
      console.log("room is...", room);
    });
  });
};
