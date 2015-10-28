import _ from 'lodash';
import Mongoose from 'mongoose';
import { model as Song } from '../models/song';
import { model as Playlist } from '../models/playlist';

Mongoose.connect(process.env.MONGOLAB_URI);

function getPlaylists(callback) {
  Playlist.find({}, { _id: 1 }, callback);
}

function getPlaylist(name, callback) {
  findOnePlaylist(name, (error, playlist) => {
    if (playlist) {
      playlist = playlist.toObject();
      delete playlist._id;
    }
    callback(error, playlist);
  });
}

function createPlaylist(name, callback) {
  const playlist = new Playlist({ _id: name });
  playlist.save(callback);
}

function addSong(playlistName, song, callback) {
  findOnePlaylist(playlistName, (error, playlist) => {
    if (error) { return callback(error); }
    if (_.some(playlist.songs, { _id: song._id })) {
      return callback();
    }
    playlist.songs.push(new Song(song));
    playlist.save(callback);
  });
}

function vote (playlistName, songId, number, callback) {
  findOnePlaylist(playlistName, (error, playlist) => {
    if (error) { return callback(error); }
    const songIndex = _.findIndex(playlist.songs, { _id: songId });
    if (songIndex >= 0) {
      playlist.songs[songIndex].votes += number;
      playlist.save(callback);
    } else {
      return callback({ code: 400, message: 'No such song'});
    }
  });
}

export default {
  getPlaylists,
  getPlaylist,
  createPlaylist,
  addSong,
  vote
};

function findOnePlaylist (name, callback) {
  Playlist.findOne({ _id: name }, (error, playlist) => {
    if (error) {
      return callback(error);
    }
    if (!playlist) {
      return callback({ code: 400, message: 'No such playlist' });
    }
    callback(null, playlist);
  });
}