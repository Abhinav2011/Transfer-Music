import axios from "axios";

const URL = "https://www.googleapis.com/youtube/v3";

const youtubeAccessToken = localStorage.getItem("youtubeAccessToken");

const getYouTubePlaylist = async () => {
  const config = {
    params: {
      "part": "snippet,contentDetails",
      "mine": "true",
    },
    headers: {
      "Authorization": `Bearer ${youtubeAccessToken}`,
      "Content-Type": "application/json",
    },
  };
  const data = await axios.get(`${URL}/playlists`, config);
  return data;
};

const getYouTubePlaylistItems = async (playlistId) => {
  const config = {
    params: {
      "part": "snippet,contentDetails",
      "playlistId":playlistId,
    },
    headers: {
      "Authorization": `Bearer ${youtubeAccessToken}`,
      "Content-Type": "application/json",
    },
  };
  const data = axios.get(`${URL}/playlistItems`, config);
  return data;
};

export { getYouTubePlaylist, getYouTubePlaylistItems};
