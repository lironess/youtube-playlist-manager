import Joi from 'joi';
import Boom from 'boom';
import Db from './db';

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
        if (error && error.code === 400) {
          return reply(Boom.badRequest(error.message));
        }
        if (error) {
          return reply(Boom.badImplementation(error));
        }
        reply(reformatPlaylist(playlist));
      });
    }
  },
  create: {
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
  }
};

function reformatPlaylist(playlist) {
  if (!playlist.nowPlaying) {
    playlist.nowPlaying = null;
  }
  playlist.songs.forEach((song) => {
    song.id = song._id;
    delete song._id;
  });
  return playlist;
}