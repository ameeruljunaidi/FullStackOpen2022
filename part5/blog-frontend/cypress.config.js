const { defineConfig } = require('cypress')

module.exports = defineConfig({
  projectId: '3bb7u7',
  e2e: {
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
  }
})