import exampleRoute from './server/routes/example';

export default function (kibana) {
  return new kibana.Plugin({
    require: ['elasticsearch'],
    name: 'ossec_plugin',
    uiExports: {
      app: {
        title: 'Ossec Plugin',
        description: 'A plugin to manage OSSEC',
        main: 'plugins/ossec_plugin/app',
      },
      styleSheetPaths: require('path').resolve(__dirname, 'public/app.scss'),
    },

    config(Joi) {
      return Joi.object({
        enabled: Joi.boolean().default(true),
      }).default();
    },

    init(server, options) { // eslint-disable-line no-unused-vars
      // Add server routes and initialize the plugin here
      exampleRoute(server);
    }
  });
}
