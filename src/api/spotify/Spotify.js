import axios from "axios";

const URL = "https://api.spotify.com/v1";

const spotifyAccessToken = localStorage.getItem("spotifyAccessToken");

//GET
const getCurrentUserPlaylist = async () => {
  const config = {
    headers: {
      Authorization: `Bearer ${spotifyAccessToken}`,
      "Content-Type": "application/json",
    },
  };
  const playListData = await axios.get(`${URL}/me/playlists`, config);
  return playListData;
};

//GET
const getSongsInsideCurrentUserPlaylist = async (playlistId) => {
  const config = {
    headers: {
      Authorization: `Bearer ${spotifyAccessToken}`,
      "Content-Type": "application/json",
    },
  };
  const songsInsidePlaylistData = await axios.get(
    `${URL}/playlists/${playlistId}/tracks`,
    config
  );
  return songsInsidePlaylistData;
};

//GET
const getSpotifyUserId = async () => {
  const config = {
    headers: {
      Authorization: `Bearer ${spotifyAccessToken}`,
      "Content-Type": "application/json",
    },
  };
  const data = await axios.get(`${URL}/me`, config);
  return data;
};

//POST
const createSpotifyPlaylist = async (userId, playlistName) => {
  const data = {
    name: playlistName,
    public: false,
  };
  const config = {
    headers: {
      Authorization: `Bearer ${spotifyAccessToken}`,
      "Content-Type": "application/json",
    },
  };

  const res = await axios.post(
    `${URL}/users/${userId}/playlists`,
    data,
    config
  );
  return res;
};

//GET
const searchSpotifyForSong = async (songName) => {
  const config = {
    params: {
      q: songName,
      type: "track",
      limit: "1",
    },
    headers: {
      Authorization: `Bearer ${spotifyAccessToken}`,
      "Content-Type": "application/json",
    },
  };

  const data = await axios.get(`${URL}/search`, config);
  return data;
};

//POST
const insertSongInSpotifyPlaylist = async (playlistID, uris) => {
  const data = {
    "uris": uris
  }
  const config = {
    headers: {
      Authorization: `Bearer ${spotifyAccessToken}`,
      "Content-Type": "application/json",
    },
  };

  const res = await axios.post(`${URL}/playlists/${playlistID}/tracks`,data,config);
  return res;
};

export {
  getCurrentUserPlaylist,
  getSongsInsideCurrentUserPlaylist,
  getSpotifyUserId,
  createSpotifyPlaylist,
  searchSpotifyForSong,
  insertSongInSpotifyPlaylist,
};
