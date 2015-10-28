import Playlists from '../controllers/playlists';
import Song from '../controllers/song';

export default {
  endpoints: [
    {
      method: 'GET',
      path: '/',
      handler: (request, reply) => {
        reply('I\'m alive.');
      }
    },
    {
      method: 'GET',
      path: '/playlists',
      config: Playlists.getAll
    },
    {
      method: 'GET',
      path: '/playlists/{name}',
      config: Playlists.getOne
    },
    {
      method: 'POST',
      path: '/playlists',
      config: Playlists.create
    },
    {
      method: 'POST',
      path: '/playlists/{name}',
      config: Song.create
    },
    {
      method: 'POST',
      path: '/playlists/{name}/up',
      config: Song.voteUp
    },
    {
      method: 'POST',
      path: '/playlists/{name}/down',
      config: Song.voteDown
    }
  ]
};