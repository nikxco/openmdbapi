/* eslint-disable no-unused-vars */
import path from 'path'

/* istanbul ignore next */
const requireProcessEnv = (name) => {
  if (!process.env[name]) {
    throw new Error('You must set the ' + name + ' environment variable')
  }
  return process.env[name]
}

/* istanbul ignore next */
if (process.env.NODE_ENV !== 'production') {
  const dotenv = require('dotenv-safe')
  dotenv.load({
    path: path.join(__dirname, '../.env'),
    sample: path.join(__dirname, '../.env.example')
  })
}


const config = {
  all: {
    env: process.env.NODE_ENV || 'development',
    root: path.join(__dirname, '..'),
    port: process.env.PORT || 9000,
    ip: process.env.IP || '0.0.0.0',
    apiRoot: process.env.API_ROOT || '/api',
    defaultEmail: 'no-reply@openmdbapi.com',
    sendgridKey: requireProcessEnv('SENDGRID_KEY'),
    masterKey: requireProcessEnv('MASTER_KEY'),
    jwtSecret: requireProcessEnv('JWT_SECRET'),
    tmdbApi: {
      key: requireProcessEnv('TMDB_API_KEY'),
      host: requireProcessEnv('TMDB_API_HOST'),
      version: requireProcessEnv('TMDB_API_VERSION'),
      protocol: requireProcessEnv('TMDB_API_PROTOCOL')
    }, 
    mongo: {
      options: {
        db: {
          safe: true
        } 
      }
    }
  },
  test: {
    mongo: {
      uri: 'mongodb://localhost/openmdbapi-test',
      options: {
        debug: false
      }
    }
  },
  development: {
    mongo: {
      uri: 'mongodb://localhost/openmdbapi-dev',
      options: {
        debug: true
      }
    }
  },
  production: {
    ip: process.env.IP || undefined,
    port: process.env.PORT || 8080,
    mongo: {
      uri: process.env.MONGODB_URI || 'mongodb://localhost/openmdbapi'
    }
  }
}

module.exports = Object.assign(config.all, config[config.all.env])
export default module.exports
