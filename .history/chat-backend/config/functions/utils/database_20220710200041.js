async function findUser(username, room) {
  try {
    const userExists = await strapi.services.users.find({ username, room });
    return userExists;
  } catch (error) {
    console.log("Erro ao procurar usuário.", error);
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
    console.log("Erro ao criar usuário", error);
  }
}

async function userExists(id) {
  try {
    const user = await strapi.services.users.findOne({ id: id });
    return user;
  } catch (error) {
    console.log("Erro ao procurar usuário.", error);
  }
}

module.exports = {
  findUser,
  createUser,
  userExists,
};
