import Joi from 'joi';
import Boom from 'boom';
import Db from './db';
import Youtube from './youtube';

export default {
  create: {
    validate: {
      params: { name: Joi.string().required() },
      payload: { youtubeUrl: Joi.string().required() }
    },
    handler: (request, reply) => {
      Youtube.getVideoInfo(request.payload.youtubeUrl, (youtubeError, videoData) => {
        if (youtubeError) { reply(Boom.badRequest(youtubeError)); }
        Db.addSong(request.params.name, videoData, (error) => {
          if (error && error.code === 400) {
            return reply(Boom.badRequest(error.message));
          }
          return error ? reply(Boom.badImplementation(error)) : reply('Success');
        });
      });
    }
  },
  voteUp: {
    validate: {
      params: { name: Joi.string().required() },
      payload: { songId: Joi.string().required() }
    },
    handler: (request, reply) => {
      Db.vote(request.params.name, request.payload.songId, 1, (error) => {
        if (error && error.code === 400) {
          return reply(Boom.badRequest(error.message));
        }
        return error ? reply(Boom.badImplementation(error)) : reply('Success');
      });
    }
  },
  voteDown: {
    validate: {
      params: { name: Joi.string().required() },
      payload: { songId: Joi.string().required() }
    },
    handler: (request, reply) => {
      Db.vote(request.params.name, request.payload.songId, -1, (error) => {
        if (error && error.code === 400) {
          return reply(Boom.badRequest(error.message));
        }
        return error ? reply(Boom.badImplementation(error)) : reply('Success');
      });
    }
  },
  next: {
    validate: {
      params: { name: Joi.string().required() },
    },
    handler: (request, reply) => {
      Db.nextSong(request.params.name, (error) => {
        if (error && error.code === 400) {
          return reply(Boom.badRequest(error.message));
        }
        return error ? reply(Boom.badImplementation(error)) : reply('Success');
      });
    }
  }
};