module.exports = {
  getUser: async (bot, id) => {
    return bot.users.fetch(id);
  },
};
