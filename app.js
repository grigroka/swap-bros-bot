'use strict';

const Commando = require('discord.js-commando');
const path = require('path');
const sqlite = require('sqlite');
const { owner, token, commandPrefix } = require('./.config.js');

// Init client
const client = new Commando.Client({
  commandPrefix,
  owner,
  disableEveryone: true
});

client
  .setProvider(
    sqlite
      .open(path.join(__dirname, 'settings.sqlite3'))
      .then(db => new Commando.SQLiteProvider(db))
  )
  .catch(console.error);

client.registry
  // Registers your custom command groups
  .registerGroups([['main', 'Main bot commands']])

  // Registers all built-in groups, commands, and argument types
  .registerDefaults()

  // Registers all of your commands in the ./commands/ directory
  .registerCommandsIn(path.join(__dirname, 'commands'));

client.on('ready', () => {
  console.log('Logged in!');
  client.user.setActivity('with himself');
});

// Login
client.login(token);
