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
    cors: {
      origin: "http://localhost:3000",
      methods: ["GET", "POST"],
      allowedHeaders: ["my-custom-header"],
      credentials: true,
    },
  });

  io.on("connection", function (socket) {
    socket.on("join", async ({ username, room }, callback) => {
      try {
        const userExists = await findUser(username, room);

        if (userExists.length > 0) {
          callback(
            `O usuário ${username} já existe na sala ${room}. Escolha um nome diferente ou sala.`
          );
        } else {
          const user = await createUser({
            username: username,
            room: room,
            status: "ONLINE",
            socketId: socket.id,
          });

          if (user) {
            socket.join(user.room);
            socket.emit("welcome", {
              user: "bot",
              text: `${user.username}, Welcome to room ${user.room}.`,
              userData: user,
            });
            socket.broadcast.to(user.room).emit("message", {
              user: "bot",
              text: `${user.username} has joined`,
            });
          } else {
            callback(`user could not be created. Try again!`);
          }
        }
        callback();
      } catch (err) {
        console.log("Err occured, Try again!", err);
      }
    });
  });
};
