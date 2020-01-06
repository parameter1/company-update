'use strict';

const EmberApp = require('ember-cli/lib/broccoli/ember-app');

module.exports = function(defaults) {
  let app = new EmberApp(defaults, {
    // Add options here
    ace: {
      modes: ['html'],
      workers: ['html'],
      workerPath: '/app/assets/ace',
      themes: ['chrome'],
      useSoftTabs: true,
      tabSize: 2,
      useWrapMode: false,
    },
    emberApolloClient: {
      keepGraphqlFileExtension: false,
    },
    'ember-froala-editor': {
      plugins: 'char_counter',
    },
    babel: {
      plugins: ['transform-object-rest-spread']
    },
  });

  // Bootstrap JS and source maps.
  app.import('node_modules/diff/dist/diff.min.js');
  app.import('node_modules/bootstrap/dist/js/bootstrap.bundle.min.js');
  app.import('node_modules/bootstrap/dist/js/bootstrap.bundle.min.js.map', { destDir: 'assets' });

  return app.toTree();
};
