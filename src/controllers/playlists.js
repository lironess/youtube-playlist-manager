import Joi from 'joi';
import Boom from 'boom';
import Db from './db';
import Youtube from './youtube';

export default {
  getAll: {
    handler: (request, reply) => {
      Db.getPlaylists((error, playlists) => {
        if (error) {
          reply(Boom.badImplementation(error));
        } else {
          reply(playlists.map((playlist) => playlist._id));
        }
      });
    }
  },
  getOne: {
    validate: { params: { name: Joi.string().required() } },
    handler: (request, reply) => {
      Db.getPlaylist(request.params.name, (error, playlist) => {
        if (error) {
          return reply(Boom.badImplementation(error));
        }
        if (playlist.length === 0) {
          return reply(Boom.notFound('No such playlist'));
        }
        if (!playlist.nowPlaying) {
          playlist.nowPlaying = null;
        }
        reply(playlist);
      });
    }
  },
  createPlaylist: {
    validate: { payload: { name: Joi.string().required() } },
    handler: (request, reply) => {
      Db.createPlaylist(request.payload.name, (error) => {
        if (error && error.code === 11000) {
          return reply(Boom.badRequest('There is a playlist with this name'));
        }
        if (error) {
          return reply(Boom.badImplementation(error));
        }
        reply('Success');
      });
    }
  },
  createSong: {
    validate: {
      params: { name: Joi.string().required() },
      payload: { youtubeUrl: Joi.string().required() }
    },
    handler: (request, reply) => {
      Youtube.getVideoInfo(request.payload.youtubeUrl, (error, videoData) => {
        if (error) { reply(Boom.badRequest(error)); }
        Db.addSong(request.params.name, videoData, (dbError) => {
          return dbError ? reply(Boom.badImplementation(dbError)) : reply('Success');
        });
      });
    }
  },
};