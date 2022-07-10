async function findUser(username, room) {
  try {
    const userExists = await strapi.services.users.find({ username, room });
    return userExists;
  } catch (error) {
    console.log("error while fetching", error);
  }
}
