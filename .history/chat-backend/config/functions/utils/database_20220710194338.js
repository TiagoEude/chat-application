async function findUser(username, room) {
  try {
    const userExists = await strapi.services.users.find({ username, room });
    return userExists;
  } catch (error) {
    console.log("error while fetching", error);
  }
}

async function createUser({ username, room, status, socketId }) {
  try {
    const user = await strapi.services.users.create({
      username,
      room,
      status: status,
      socketId,
    });
    return user;
  } catch (error) {
    console.log("error while creating", error);
  }
}

module.exports = {
  findUser,
  createUser,
};
