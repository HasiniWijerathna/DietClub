'use strict';

/**
 * The possible combinations of the environment string
 * @type {Object}
 */
const environmentMap = {
  dev: 'development',
  development: 'development',
  qa: 'qa',
  stag: 'staging',
  staging: 'staging',
  prod: 'production',
  production: 'production',

  // Fallback
  default: 'development',
};

let environment = null;

// Find out if we have our argument available among all arguments
process.argv.forEach((val) => {
  const envIndex = val.indexOf('env=');

  if (envIndex > -1) {
    // Split the environment string
    environment = val.split('=').pop();
  }
});

// Implementing the fallback option
environment = environmentMap[environment] || environmentMap.default;

// Export the mapped environment string
module.exports = environment;
