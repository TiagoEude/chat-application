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
        }
      } catch (error) {}

      console.log("user connected");
      console.log("username is ", username);
      console.log("room is...", room);
    });
  });
};
