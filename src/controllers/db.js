import Mongoose from 'mongoose';
import { model as Playlist } from '../models/playlist';

Mongoose.connect(process.env.MONGOLAB_URI);

function getPlaylists(callback) {
  Playlist.find({}, { _id: 0 }, callback);
}

function getPlaylist(name, callback) {
  Playlist.find({ _id: name }, { _id: 0 }, callback);
}

function createPlaylist(name, callback) {
  const playlist = new Playlist({ _id: name, nowPlaying: {} });

  playlist.save(callback);
}

export default { getPlaylists, getPlaylist, createPlaylist };