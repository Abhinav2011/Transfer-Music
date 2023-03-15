import axios from "axios";

const URL = "https://www.googleapis.com/youtube/v3";

const youtubeAccessToken = localStorage.getItem("youtubeAccessToken");

//GET 
const getYouTubePlaylist = async (nextPageToken) => {
  const config = {
    params: {
      "part": "snippet,contentDetails",
      "mine": "true",
      "pageToken":nextPageToken
    },
    headers: {
      "Authorization": `Bearer ${youtubeAccessToken}`,
      "Content-Type": "application/json",
    },
  };
  const data = await axios.get(`${URL}/playlists`, config);
  return data;
};

//GET
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

//POST
const createYouTubePlaylist = async (title) => {
  //axios.post(api, data, config)
  const data = {
    "snippet": {
      "title": title
    }
  }
  const config = {
    params: {
      "part": "snippet,contentDetails",
    },
    headers: {
      "Authorization": `Bearer ${youtubeAccessToken}`,
      "Content-Type": "application/json",
    },
  };
  const res = await axios.post(`${URL}/playlists`,data,config);
  return res;
}

//GET 
const searchYouTubeForSong = async (songName) => {
  const config = {
    params: {
      "part": "snippet",
      "q":songName,
    },
    headers: {
      "Authorization": `Bearer ${youtubeAccessToken}`,
      "Content-Type": "application/json",
    },
  };
  const data = await axios.get(`${URL}/search`,config);
  return data;
}

//POST
const addSongToYouTubePlaylist = async (playlistId,videoId) => {
  const data = {
    "snippet": {
      "playlistId": playlistId,
      "resourceId":videoId
    }
  }
  const config = {
    params: {
      "part": "snippet",
    },
    headers: {
      "Authorization": `Bearer ${youtubeAccessToken}`,
      "Content-Type": "application/json",
    },
  };

  const res = await axios.post(`${URL}/playlistItems}`,data,config);
  return res;
}
export { getYouTubePlaylist, getYouTubePlaylistItems,createYouTubePlaylist,searchYouTubeForSong,addSongToYouTubePlaylist};
