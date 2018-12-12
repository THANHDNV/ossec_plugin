export default function (server) {

  server.route({
    path: '/api/ossec-plugin/example',
    method: 'GET',
    handler(req, reply) {
      reply({ time: (new Date()).toISOString() });
    }
  });

  server.route({
    path: '/api/ossec-plugin/api-path',
    method: 'GET',
    handler(req, reply) {
      const config = req.server.config();
      const apiPath = config.get('ossec_plugin.apiPath');

      reply({ apiPath: apiPath });
    }
  });
}
