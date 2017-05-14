'use strict';

const FlowBot = require('flow-bot').FlowBot;
const LoopbackCollection = require('flow-bot').LoopbackCollection;
const FlowStorage = require('flow-bot').FlowStorage;
const Dashbot = require('dashbot');

module.exports = function(server) {

  var storage = new FlowStorage({collectionClass: LoopbackCollection, collectionSettings: { model: server.models.Variable}});
  var opts = {
    defaultLocale: 'en',
    botPath: './bot',
    storage: storage
  };

  server.bot = new FlowBot(opts);
  server.bot.loopback = server;
  server.post('/api/messages', server.bot.connector.listen());

  const dashbotApiMap = {
    facebook: process.env.DASHBOT_API_KEY_FACEBOOK,
    webchat: process.env.DASHBOT_API_KEY_GENERIC,
    slack: process.env.DASHBOT_API_KEY_SLACK
  }
  const dashbot = Dashbot(dashbotApiMap).microsoft;
  dashbot.setFacebookToken(process.env.FACEBOOK_PAGE_TOKEN);
  server.bot.bot.use(dashbot);
};
