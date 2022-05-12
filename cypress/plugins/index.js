/// <reference types="cypress" />
// ***********************************************************
// This example plugins/index.js can be used to load plugins
//
// You can change the location of this file or turn off loading
// the plugins file with the 'pluginsFile' configuration option.
//
// You can read more here:
// https://on.cypress.io/plugins-guide
// ***********************************************************

// This function is called when a project is opened or re-opened (e.g. due to
// the project's config changing)



/**
 * @type {Cypress.PluginConfig}
 */
module.exports = (on, config) => {
  

  const baseUrl = config.env.host || null;

  if (baseUrl) {
    config.baseUrl = baseUrl;
  }
  
  return config;
};


 const fs = require('fs-extra');
 const path = require('path');
 
 function getConfigurationByFile(file) {
   const pathToConfigFile = path.resolve(
     '..',
     'automation-suite/cypress/configFiles',
     `${file}.json`
   );
 
   return fs.readJson(pathToConfigFile);
 }
 
