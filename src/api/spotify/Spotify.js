import axios from "axios";

const URL = 'https://api.spotify.com/v1';

const spotifyAccessToken = localStorage.getItem("spotifyAccessToken");

const getCurrentUserPlaylist = async () => {
    const config = {
        headers:{
            "Authorization":`Bearer ${spotifyAccessToken}`,
            "Content-Type": "application/json",
        }
    }
    const playListData = await axios.get(`${URL}/me/playlists`,config);
    return playListData;
}

const getSongsInsideCurrentUserPlaylist = async (playlistId) => {
    const config = {
        headers:{
            "Authorization":`Bearer ${spotifyAccessToken}`,
            "Content-Type": "application/json",
        }
    }
    const songsInsidePlaylistData = await axios.get(`${URL}/playlists/${playlistId}/tracks`,config);
    return songsInsidePlaylistData;
}

export {getCurrentUserPlaylist, getSongsInsideCurrentUserPlaylist};