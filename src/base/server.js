import Hapi from 'hapi';
import Config from './config';
import Routes from './routes';

const server = new Hapi.Server({
  connections: { router: { stripTrailingSlash: true } }
});

server.connection({port: process.env.PORT || Config.port});
server.route(Routes.endpoints);
server.start(() => {
  console.log('Server running at: ', server.info.uri);
})