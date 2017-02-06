'use strict';

module.exports = {
  TOKEN_KEY: process.env.TOKEN_KEY || '29j3f029k',
  TOKEN_EXPIRY_TIME: 60 * 60 * 24,
  MONGODB_URI: process.env.MONGODB_URI || 'mongodb://localhost:27017/event',
  PORT: process.env.PORT || 3000
};
