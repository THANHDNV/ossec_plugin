export default function (server) {

  server.route({
    path: '/api/ossec-plugin/example',
    method: 'GET',
    handler(req, reply) {
      reply({ time: (new Date()).toISOString() });
    }
  });

}
