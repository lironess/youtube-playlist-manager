export default {
  endpoints: [{
    method: 'GET',
    path: '/',
    handler: (request, reply) => {
      reply('Hello world !');
    }
  }]
};