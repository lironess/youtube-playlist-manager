import Joi from 'joi';
import Db from './db';
import Boom from 'boom';

export default {
  getAll: {
    handler: (request, reply) => {
      Db.getPlaylists((error, playlists) => {
        if (error) {
          reply(Boom.badImplementation(error));
        } else {
          reply(playlists);
        }
      });
    }
  },
  getOne: {
    validate: { params: { name: Joi.string() } },
    handler: (request, reply) => {
      Db.getPlaylist(request.params.name, (error, playlists) => {
        if (error) {
          return reply(Boom.badImplementation(error));
        }
        if (playlists.length === 0) {
          return reply(Boom.notFound('No such playlist'));
        }
        reply(playlists);
      });
    }
  },
  create: {
    validate: { params: { name: Joi.string() } },
    handler: (request, reply) => {
      Db.createPlaylist(request.params.name, (error) => {
        if (error && error.code === 11000) {
          return reply(Boom.badRequest('There is a playlist with this name'));
        }
        if (error) {
          return reply(Boom.badImplementation(error));
        }
        reply('Success');
      });
    }
  }
};