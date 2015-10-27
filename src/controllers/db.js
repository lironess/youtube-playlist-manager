import Mongoose from 'mongoose';
import { model as Song } from '../models/song';
import { model as Playlist } from '../models/playlist';

Mongoose.connect(process.env.MONGOLAB_URI);

function getPlaylists(callback) {
  Playlist.find({}, { _id: 1 }, callback);
}

function getPlaylist(name, callback) {
  Playlist.findOne({ _id: name }, { _id: 0 }, callback);
}

function createPlaylist(name, callback) {
  const playlist = new Playlist({ _id: name });

  playlist.save(callback);
}

function addSong(playlistName, song, callback) {
  Playlist.findOne({ _id: playlistName }, (error, playlist) => {
    if (error) { return callback(error); }
    playlist.songs.push(new Song(song));
    playlist.save(callback);
  });
}

export default { getPlaylists, getPlaylist, createPlaylist, addSong };