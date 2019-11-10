require('dotenv').config();
const { Keystone } = require('@keystonejs/keystone');
const { PasswordAuthStrategy } = require('@keystonejs/auth-password');
const { GraphQLApp } = require('@keystonejs/app-graphql');
const { AdminUIApp } = require('@keystonejs/app-admin-ui');
const { StaticApp } = require('@keystonejs/app-static');

const { KnexAdapter: Adapter } = require('@keystonejs/adapter-knex');

// Configure Adapter
const keystone = new Keystone({
  name: process.env.PROJECT_NAME,
  adapter: new Adapter(require('./config/adapter')),
});

// create Lists and items
keystone.createList('User', require('./models/userSchema'));
keystone.createList('UserAddress', require('./models/userAddressSchema'));

// populate with seeds
keystone.createItems({
  User: require('./seeds/users')
});

const authStrategy = keystone.createAuthStrategy({
  type: PasswordAuthStrategy,
  list: 'User',
});

module.exports = {
  keystone,
  apps: [
    new GraphQLApp(),
    new StaticApp({ path: '/', src: 'public' }),
    new AdminUIApp({ enableDefaultRoute: true, authStrategy }),
  ],
};
