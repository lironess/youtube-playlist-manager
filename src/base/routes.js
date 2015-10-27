import Playlists from '../controllers/playlists';

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
      config: Playlists.createPlaylist
    },
    {
      method: 'POST',
      path: '/playlists/{name}',
      config: Playlists.createSong
    }
  ]
};